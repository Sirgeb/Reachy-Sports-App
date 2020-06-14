import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getUser: async (_, { userId }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return prisma.user({ id: userId }).$fragment(USER_FRAGMENT);
    }
  }
};
