import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getPosts: async () => {
      return prisma.posts({
        orderBy: "createdAt_DESC"
      });
    }
  }
};
