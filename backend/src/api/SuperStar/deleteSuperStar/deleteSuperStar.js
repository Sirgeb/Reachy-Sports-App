import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteSuperStar: async (_, { superStarId }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      
      return prisma.deleteSuperStar({
        id: superStarId
      });
    }
  }
};
