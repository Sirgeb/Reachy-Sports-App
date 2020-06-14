import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getUsers: async (_, __, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      return prisma.users({ orderBy: "createdAt_DESC" }).$fragment(USER_FRAGMENT);
    }
  }
};
