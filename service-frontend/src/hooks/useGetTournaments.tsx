import { useEffect, useState } from "react";
import { Category, TournamentDTO } from "../entities/dtos/TournamentDTO";
import TournamentAPI from "../services/TournamentApi";
import { TourDTO } from "../entities/dtos/TourDTO";
import { TournamentFieldErrors } from "../errors/TournamentErrors";

const tournAPI = new TournamentAPI();

interface TournamentResponse {
  [tournamentId: string]: {
    tournamentName: string;
    teamsCount: string;
    master: number;
    categories: Category[];
  };
}

export default function useGetTournaments(tour: TourDTO | null) {
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);

  const [error, setError] = useState<string>("");

  if (!tour) {
    return {
      tournaments,
      tournAPI,
      error,
    };
  }

  const getTournaments = async () => {
    const tournArray: TournamentDTO[] = [];
    let tournData: TournamentResponse = {};

    const tournRes = await tournAPI.getTournaments(tour.Id);

    if (!tournRes.fieldErrors?.notFound) {
      tournData = tournRes;
      for (const [tournamentId, tournamentData] of Object.entries(tournData)) {
        const newTourn = new TournamentDTO();

        newTourn.Id = tournamentId;
        newTourn.Title = tournamentData.tournamentName;
        newTourn.TeamsCount = parseInt(tournamentData.teamsCount, 10);
        newTourn.Master = tournamentData.master;
        newTourn.Categories = tournamentData.categories;

        tournArray.push(newTourn);
      }

      setTournaments(tournArray);
    } else {
      setError(tournRes.fieldErrors.notFound);

      return {
        tournaments,
        tournAPI,
        error,
      };
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return { tournaments, tournAPI, error };
}
