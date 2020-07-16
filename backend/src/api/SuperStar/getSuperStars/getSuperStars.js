import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getSuperStars: async (_, { skip, after, first, last }) => {
      return prisma.superStars({ skip, after, first, last, orderBy: "createdAt_DESC" });
    }
  }
};
