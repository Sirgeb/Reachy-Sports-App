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
            id: "ckankn6zgoutp0941gmu5okrh"
          }
        }
      });

      return true;
    }
  }
}
