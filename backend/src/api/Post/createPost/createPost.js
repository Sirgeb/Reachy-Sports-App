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
            id: "ckanl3bg2000s0725mlfqyjoo"
          }
        }
      });

      return true;
    }
  }
}
