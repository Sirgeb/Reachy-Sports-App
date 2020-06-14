import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      await prisma.createComment({
        text,
        user: {
          connect: {
            id: request.user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        }
      });
      return true;
    }
  }
}
