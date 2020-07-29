import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getAuthenticatedUser: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return prisma.user({ id: request.user.id }).$fragment(USER_FRAGMENT);
    }
  }
};
