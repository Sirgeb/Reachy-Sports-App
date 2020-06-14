import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updatePost: async (_, args, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      
      const update = { ...args };
      delete update.postId;

      await prisma.updatePost({ data: {
        ...update
      }, where: {
        id: args.postId
      }});

      return true;
    }
  }
};
