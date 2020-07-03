import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragments';

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      return prisma.createComment({
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
      }).$fragment(COMMENT_FRAGMENT);
    }
  }
}
