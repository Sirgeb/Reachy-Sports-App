import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getComments: async (_, { postId }) => {
      return prisma.comments({ where: { 
          post: {
            id: postId
          }
        }, 
        orderBy: "createdAt_DESC" });
    }
  }
};
