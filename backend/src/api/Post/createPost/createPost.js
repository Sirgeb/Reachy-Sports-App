import { prisma } from '../../../../generated/prisma-client';
import { userAuthenticatedWith } from '../../../utils';

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { image, caption, description, category } = args;
      const { permission, facebookID, googleID } = request.user;

      await prisma.createPost({
        image,
        caption,
        description,
        category,
        user: {
          connect: userAuthenticatedWith(facebookID, googleID)
        }
      });

      return true;
    }
  }
}
