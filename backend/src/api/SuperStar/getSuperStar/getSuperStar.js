import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getSuperStar: async (_, { superStarId }) => {
      return prisma.superStar({ id: superStarId });
    }
  }
};
