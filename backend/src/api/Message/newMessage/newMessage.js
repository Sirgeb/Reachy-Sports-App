import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, { groupId }) => {
        return prisma.$subscribe.message({
           node: {
             group: {
               id: groupId
             }
           }
        }).node();
      },
      resolve: (payload) => {
        return payload;
      }
    }
  }
};
