import { prisma } from "../../../../generated/prisma-client";
import { MESSAGE_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    getMessages: async (_, { groupId }, { request, isAuthenticated }) => {
      isAuthenticated(request);

      return prisma.messages({ where: { 
          group: {
            id: groupId
          }
        },  
        orderBy: "createdAt_DESC" }).$fragment(MESSAGE_FRAGMENT);
    }
  }
};
