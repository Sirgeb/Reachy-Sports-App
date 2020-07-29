import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    featuredPosts: async () => {
      return prisma.posts({
        first: 4,
        where: {
          isFeatured: true
        }, 
        orderBy: "createdAt_DESC"
      });
    }
  }
};
