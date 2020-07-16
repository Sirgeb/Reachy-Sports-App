import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createSuperStar: async (_, args, { request, isAuthenticated, isAdmin }) => {
      const { fullname, title, image, category, dateOfBirth, location, bio } = args;
      isAuthenticated(request);
      isAdmin(request);

      const exists = await prisma.$exists.superStar({
        AND: [{ fullname }, { title }, { category }]
      });

      if (exists) {
        throw new Error("Super Star Already Exist")
      }

      return prisma.createSuperStar({
        fullname,
        title,
        image, 
        category,
        dateOfBirth,
        location,
        bio
      }); 
    }
  }
}
