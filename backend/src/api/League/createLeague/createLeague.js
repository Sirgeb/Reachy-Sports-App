import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createLeague: async (_, { leagueId, name }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);

      const exists = await prisma.$exists.league({ leagueId })
      
      if (exists) {
        throw new Error("League already exist");
      }

      await prisma.createLeague({
        name,
        leagueId
      });

      return true;
    }
  }
}
