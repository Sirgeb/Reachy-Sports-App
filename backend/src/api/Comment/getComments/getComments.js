import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    getComments: async (_, { postId }) => {
      return prisma.comments({ where: { 
          post: {
            id: postId
          }
        }, 
        orderBy: "createdAt_DESC" }).$fragment(COMMENT_FRAGMENT);
    }
  }
};
