import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPosts: async (_, { skip, after, first, last, keyword }) => {
      const searchTerm = keyword.trim().toLowerCase();
      if (searchTerm) {
        return prisma.posts({ skip, after, first, last, where: {
          OR: [{
            caption_contains: searchTerm,
          }, {
            description_contains: searchTerm
          }]
        }, orderBy: "createdAt_DESC" });
      } else { 
        return [];
      }
    }
  }
};
