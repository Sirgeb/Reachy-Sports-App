import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateLeague: async (_, 
      { id, leagueId, name }, 
      { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      
      return prisma.updateLeague({ where: { id }, data: {
        leagueId,
        name
      }});
    }
  }
};
