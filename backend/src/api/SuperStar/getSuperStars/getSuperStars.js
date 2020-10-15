import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getSuperstars: async () => {
      return prisma.superStars({
        orderBy: "createdAt_DESC"
      });
    }
  }
};
