import { Category } from "../entities/dtos/TournamentDTO";
import GeneralAPI from "./GeneralApi";

export interface DeletedTournament {
  tournamentId: string;
  userId?: string;
}

export interface TournCredentials {
  userId?: string;
  tourId?: string;
  title: string;
  master: number;
  categories: Category[];
}

class TournamentAPI extends GeneralAPI {
  async addTournament(newTournament: TournCredentials) {
    try {
      const res = await this.api.post("/tournament/create", newTournament);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getTournaments(tourId: string) {
    try {
      const res = await this.api.get(`/tournament/tourns/${tourId}`);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async deleteTour(deletedTour: DeletedTournament) {
    try {
      const res = await this.api.post("/tournament/delete", deletedTour);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default TournamentAPI;
