import { prisma } from "../../../../generated/prisma-client";
import { GROUP_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    getGroup: async (_, { groupId }) => {
      return prisma.group({ id: groupId }).$fragment(GROUP_FRAGMENT);
    }
  }
};
