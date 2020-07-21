import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchSuperStars: async (_, { skip, after, first, last, keyword }) => {
      const searchTerm = keyword.trim().toLowerCase();
      if (searchTerm) {
        return prisma.superStars({ skip, after, first, last, where: {
          fullname_contains: searchTerm
        }, orderBy: "createdAt_DESC" });
      } else { 
        return [];
      }
    }
  }
};
