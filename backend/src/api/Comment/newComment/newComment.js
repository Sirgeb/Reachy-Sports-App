import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newComment: {
      subscribe: (_, { postId }) => {
        return prisma.$subscribe.comment({
          node: {
            post: {
              id: postId
            }
          }
        }).node()
      },
      resolve: (payload) => {
        return payload;
      }
    }
  }
};
