import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createPost: async (_, args) => {
      const { image, caption, description, category } = args;

      await prisma.createPost({
        image,
        caption,
        description,
        category,
        user: {
          connect: {
            id: "ckaburcwg28640941zs77r9c8"
          }
        }
      });

      return true;
    }
  }
}
