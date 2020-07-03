import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, { commentId }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      return prisma.deleteComment({ id: commentId });
    }
  }
};
