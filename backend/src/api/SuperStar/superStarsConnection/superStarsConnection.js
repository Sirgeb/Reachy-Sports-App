import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    superStarsConnection: async (_, { first, after, category }) => {
      return prisma.superStarsConnection({ 
        orderBy: "createdAt_DESC", 
        first, 
        after, 
        where: {
          category
        }
      });
    }
  }
};
