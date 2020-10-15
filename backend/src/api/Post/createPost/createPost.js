import { prisma } from '../../../../generated/prisma-client';
import { sendPushNotification } from '../../../utils';

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);

      const { image, caption, description, isFeatured, category } = args;
      const expoToken = "ExponentPushToken[e7E9O7CNBDtKESVRBWg8LG]";

      await sendPushNotification(expoToken, "Sports Update", caption);

      await prisma.createPost({
        image,
        caption,
        description,
        category,
        isFeatured,
        user: {
          connect: {
            id: request.user.id
          }
        }
      });

      return true;
    }
  }
}
