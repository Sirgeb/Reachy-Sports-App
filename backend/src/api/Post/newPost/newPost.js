import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newPost: {
      subscribe: () => {
        return prisma.$subscribe.post({ mutation_in: 'CREATED' }).node();
      },
      resolve: (payload) => {
        return payload;
      }
    }
  }
};
