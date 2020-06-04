import { prisma } from '../../../../generated/prisma-client';
import { userAuthenticatedWith } from '../../../utils';

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { permission, facebookID, googleID } = request.user;
      return prisma.createComment({
        text,
        user: {
          connect: userAuthenticatedWith(facebookID, googleID)
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
