import { prisma } from "../../../../generated/prisma-client";
import { MESSAGE_FRAGMENT } from '../../../fragments';

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
       }).node().$fragment(MESSAGE_FRAGMENT);

      },
      resolve: (payload) => {
        return payload;
      }
    }
  }
};
