import { prisma } from "../../../../generated/prisma-client";
import { COMMENTS_CONNECTION_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    commentsConnection: async (_, { postId, first, after }) => {
      return prisma.commentsConnection({
        where: {
          post: {
            id: postId
          }
        }, orderBy: "createdAt_DESC", first, after }).$fragment(COMMENTS_CONNECTION_FRAGMENT);
    }
  }
};
