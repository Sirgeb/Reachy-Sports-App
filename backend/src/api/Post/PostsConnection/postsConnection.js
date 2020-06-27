import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    postsConnection: async (_, { first, after }) => {
      return prisma.postsConnection({ orderBy: "createdAt_DESC", first, after })
    }
  }
};
