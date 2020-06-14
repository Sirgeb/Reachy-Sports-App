import { prisma } from "../../../../generated/prisma-client";
import { GROUP_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    getGroups: async (_, __, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      return prisma.groups({ orderBy: "name_ASC" }).$fragment(GROUP_FRAGMENT);
    }
  }
};
