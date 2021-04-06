import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getLeague: async (_, { id }) => {
      return prisma.league({ id });
    }
  }
};
