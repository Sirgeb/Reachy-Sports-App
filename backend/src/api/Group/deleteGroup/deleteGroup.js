import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteGroup: async (_, { groupId }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      await prisma.deleteGroup({ id: groupId });
      return true;
    }
  }
};
