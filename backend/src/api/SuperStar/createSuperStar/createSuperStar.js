import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createSuperStar: async (_, args, { request, isAuthenticated, isAdmin }) => {
      const { fullname, image, category, dateOfBirth, bio, country } = args;
      isAuthenticated(request);
      isAdmin(request);
      const name = fullname.toLowerCase();

      const exists = await prisma.$exists.superStar({
        AND: [{ fullname: name }, { country }, { category }]
      });

      if (exists) {
        throw new Error("Super Star Already Exist")
      }

      return prisma.createSuperStar({
        fullname: name,
        image, 
        category,
        dateOfBirth,
        country,
        bio
      }); 
    }
  }
}
