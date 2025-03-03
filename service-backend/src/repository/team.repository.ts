import { AppDataSource } from "../data-source";
import { Team } from "../entity";

export const TeamRepository = AppDataSource.getRepository(Team).extend({
  async getTeams(tournamentId: string) {
    return this.createQueryBuilder("tm")
      .select('STRING_AGG(DISTINCT u."id"::TEXT, \', \') AS "usersId"')
      .addSelect('tm."teamName"', "teamName")
      .addSelect('tm."category"', "category")
      .addSelect("tm.id", "teamId")
      .addSelect("trn.title", "tournamentTitle")
      .innerJoin("team_users_user", "tuu", 'tuu."teamId" = tm.id ')
      .innerJoin("user", "u", 'u.id = tuu."userId"')
      .innerJoin("tour_users_user", "tuu2", 'tuu2."userId" = u.id ')
      .innerJoin("tour", "t", 't.id = tuu2."tourId" ')
      .innerJoin("tournament", "trn", 'trn.id = tm."tournamentId"')
      .where("trn.id = :tournamentId", { tournamentId })
      .groupBy('tm."category",tm."teamName", tm.id, trn.title')
      .getRawMany();
  },

  async getAmountPointPerUser(
    tourId: string,
    tournamentId: string,
    category: string,
    userIds: string[]
  ) {
    const subquery = await this.createQueryBuilder("t")
      .select("u.id", "userId")
      .addSelect("u.username", "userName")
      .addSelect("m.amountTourPoints", "amountPoints")
      .addSelect("t.category", "category")
      .innerJoin("team_match", "tm", 'tm."teamId" = t.id')
      .innerJoin("match", "m", 'm.id = tm."matchId"')
      .innerJoin("team_users_user", "tuu", 'tuu."teamId" = t.id')
      .innerJoin("user", "u", 'tuu."userId" = u.id')
      .innerJoin("tour_users_user", "tuu2", 'tuu2."userId" = u.id')
      .innerJoin("tour", "t2", 't2.id = tuu2."tourId"')
      .innerJoin("tournament", "trn", 'trn."tourId" = t2.id')
      .where('tm."isWinner" = true')
      .andWhere('t."category" = :category', { category })
      .andWhere("t2.id = :tourId", { tourId })
      .andWhere("u.id IN (:...userIds)", { userIds })
      .andWhere("trn.id != :tournamentId", { tournamentId })
      .andWhere("trn.isDeleted != true")
      .groupBy("u.id, u.username, m.amountTourPoints, t.category");

    return AppDataSource.createQueryBuilder()
      .select('subquery."userId"')
      .addSelect('subquery."userName"')
      .addSelect('SUM(subquery."amountPoints")', "points")
      .addSelect('subquery."category"')
      .from("(" + subquery.getQuery() + ")", "subquery")
      .setParameters(subquery.getParameters())
      .groupBy('subquery."userId", subquery."userName", subquery."category"')
      .getRawMany();
  },
});
