import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createComment: async (_, args) => {
      const { text, postId } = args;
      return prisma.createComment({
        text,
        user: {
          connect: {
            id: "ckankn6zgoutp0941gmu5okrh"
          }
        },
        post: {
          connect: {
            id: postId
          }
        }
      })
    }
  }
}
