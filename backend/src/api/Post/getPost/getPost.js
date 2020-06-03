import { prisma } from "../../../../generated/prisma-client";
import { POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    getPost: async (_, { postId }) => {
      return prisma.post({ id: postId }).$fragment(POST_FRAGMENT)
    }
  }
};
