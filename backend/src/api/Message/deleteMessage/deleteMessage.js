import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    deleteMessage: async (_, { id }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);

      await prisma.deleteMessage({ id });

      return true;
    }
  }
}
