import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    deleteLeague: async (_, { id }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      const exists = await prisma.$exists.league({ id })
      
      if (!exists) {
        throw new Error("League Does not exist");
      }

      await prisma.deleteLeague({ id });

      return true;
    }
  }
}
