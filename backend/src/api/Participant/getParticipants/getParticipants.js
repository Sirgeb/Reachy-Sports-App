import { prisma } from "../../../../generated/prisma-client";
import { PARTICIPANT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    getParticipants: async (_, { groupId }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return prisma.participants({ where: {
        groupId
      }, orderBy: "createdAt_DESC"}).$fragment(PARTICIPANT_FRAGMENT);
    }
  }
};
