import { CategoryService, MatchService, TourService } from ".";
import codeErrors from "../constants/codeErrors";
import time from "../constants/time";
import { Category, Match, Tournament } from "../entity";
import { GroupDTO } from "../entity/dtos/GroupsDTO";
import { ServiceCodeError } from "../errors/errorsClass";
import {
  ClubRepository,
  TeamRepository,
  TournamentRepository,
} from "../repository";
import { ClubData, CourtData, TeamData, TourData } from "../utils/interfaces";
import {
  shuffleArray,
  sortTeamsPerCategoryByPoints,
} from "../utils/functionHelpers";

export class TournamentService {
  private tourService: TourService;
  private categoryService: CategoryService;
  private matchService: MatchService;

  constructor() {
    this.tourService = new TourService();
    this.categoryService = new CategoryService();
    this.matchService = new MatchService();
  }

  async create(
    newTournament: Tournament,
    tourId: string,
    categoryData: Category[]
  ) {
    const existingTour = await this.tourService.findById(tourId);

    const existingCats = await this.categoryService.findCategories(
      categoryData
    );

    const newCategories = await this.categoryService.create(categoryData);
    const combinedCategories = [...existingCats, ...newCategories];

    return TournamentRepository.create(
      newTournament,
      existingTour,
      combinedCategories
    );
  }

  async delete(tournament: Tournament) {
    tournament.isDeleted = true;
    return TournamentRepository.save(tournament);
  }

  async getDataForStartingTournament(tournament: Tournament) {
    const clubsWithCat = await ClubRepository.getClubs(tournament.id);
    const teamsWithCat = await TeamRepository.getTeams(tournament.id);

    if (!clubsWithCat || clubsWithCat.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club con el Tournament ID"));
    }

    if (!teamsWithCat || teamsWithCat.length == 0) {
      throw new ServiceCodeError(
        codeErrors.GEN_2("Equipo con el Tournament ID")
      );
    }

    const clubData: ClubData[] = [];
    const teamData: TeamData[] = [];

    for (const cwc of clubsWithCat) {
      clubData.push({
        clubName: cwc.clubName,
        master: cwc.master,
        avFrom: new Date(cwc.availableFrom),
        avTo: new Date(cwc.availableTo),
        ctNumbers: cwc.courtNumbers.split(", "),
        categories: cwc.categories.split(", "),
      });
    }

    for (const twc of teamsWithCat) {
      const usersWithPoints = await TeamRepository.getAmountPointPerUser(
        twc.tourId,
        tournament.id,
        twc.category,
        twc.usersId.split(", ")
      );

      teamData.push({
        teamId: twc.teamId,
        teamName: twc.teamName,
        category: twc.category,
        totalPoints: usersWithPoints.reduce(
          (acc, user) => acc + user.points,
          0
        ),
        usersId: twc.usersId.split(", "),
      });
    }

    return { clubData, teamData };
  }

  async getHoursOfMatches(clubData: ClubData[]) {
    for (let cl of clubData) {
      cl.allHours = [];
      const firstTime = cl.avFrom;
      cl.allHours.push(firstTime);

      while (cl.avFrom.getTime() < cl.avTo.getTime() - time.DAY) {
        const newHour = new Date(cl.avFrom.getTime() + time.HOUR_HALF);
        cl.avFrom = newHour;
        cl.allHours.push(newHour);
      }

      cl.avFrom = new Date(firstTime.getTime() + time.DAY);
      cl.allHours.push(cl.avFrom);

      while (cl.avFrom.getTime() < cl.avTo.getTime()) {
        const newHour = new Date(cl.avFrom.getTime() + time.HOUR_HALF);
        cl.avFrom = newHour;
        cl.allHours.push(newHour);
      }
    }
  }

  async createGroupsDTOPerCat(
    clubData: ClubData[],
    teamData: TeamData[],
    tournament: Tournament
  ) {
    const sortedTeams = sortTeamsPerCategoryByPoints(teamData);

    const courtData = this.assignHourToCourts(clubData);

    const groupDTOs: GroupDTO[] = [];

    for (const category in sortedTeams) {
      const teams = sortedTeams[category];
      const numTeams = teams.length;

      //FIXME: Think a way to throw this error
      if (numTeams < 3) continue;

      const numGroups = numTeams / 3;
      for (let i = 0; i < numGroups; i++) {
        const team1 = teams[i * 3];
        const team2 = teams[i * 3 + 1];
        const team3 = teams[i * 3 + 2];

        const courtIndex = i % courtData.length;

        const hoursForGroup = courtData[courtIndex].allHours.slice(0, 3);
        /*let currentDate: Date = null;

        let allHours = courtData[courtIndex].allHours;

        let firstDate: Date = allHours[0];

        allHours.forEach((hour) => {
          if (
            (!currentDate ||
              hour.toDateString() == currentDate.toDateString()) &&
            hoursForGroup.length < 3 &&
            firstDate.toDateString() == currentDate.toDateString()
          ) {
            console.log(firstDate);
            shuffleArray(allHours);
            hoursForGroup.push(hour);

            courtData[courtIndex].allHours = courtData[
              courtIndex
            ].allHours.filter((item) => item !== hour);

            allHours = allHours.filter((item) => item !== hour);
            currentDate = hour;
          }
        });*/

        courtData[courtIndex].allHours =
          courtData[courtIndex].allHours.slice(3);

        const groupDTO = new GroupDTO(
          [team1.teamId, team2.teamId, team3.teamId],
          [courtData[courtIndex].courtId],
          hoursForGroup,
          20,
          50
        );

        groupDTOs.push(groupDTO);
      }
    }
    return this.createGroupsMatches(groupDTOs, tournament);
  }

  async findById(tournamentId: string) {
    const existingTourn = await TournamentRepository.findOneBy({
      id: tournamentId,
    });

    if (!existingTourn) {
      throw new ServiceCodeError(codeErrors.GEN_1("Tournament"));
    }

    return existingTourn;
  }

  public assignHourToCourts(clubData: ClubData[]) {
    const courtData: CourtData[] = [];

    clubData.forEach((cl) => {
      const hours = [...cl.allHours];
      cl.ctNumbers.forEach((courtId) => {
        const court: CourtData = {
          courtId: courtId,
          allHours: hours,
        };

        courtData.push(court);
      });
    });

    return courtData;
  }

  async createGroupsMatches(groupDTOs: GroupDTO[], tournament: Tournament) {
    const matches: Match[] = [];
    for (const grDTO of groupDTOs) {
      const teams = grDTO.teamsId;
      const courtIds = grDTO.courtsId;
      const matchDates = grDTO.matchDates;

      if (matchDates.length < 3) {
        throw new ServiceCodeError(codeErrors.GEN_2("Match Date"));
      }

      if (courtIds.length === 0) {
        throw new ServiceCodeError(codeErrors.GEN_2("Courts IDs"));
      }

      for (const courtId of courtIds) {
        let matchIndex = 0;
        for (let j = 0; j < teams.length; j++) {
          for (let k = j + 1; k < teams.length; k++) {
            // Crear un partido entre los equipos j y k
            const match = new Match();
            match.amountTourPoints = grDTO.tourPoints;
            match.amountTourCoins = grDTO.tourCoins;
            match.matchDate = matchDates[matchIndex].toISOString();

            const m = await this.matchService.create(
              match,
              [teams[j], teams[k]],
              tournament,
              courtId
            );
            matches.push(m);
            matchIndex++;
          }
        }
      }
    }
    return matches;
  }

  async getAll(tourId: string) {
    const tournaments: TourData[] = await TournamentRepository.getAll(tourId);
    if (tournaments.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Torneo"));
    }

    return tournaments;
  }
}
