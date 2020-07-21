import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateSuperStar: async (_, 
      { superStarId, fullname, title, image, dateOfBirth, location,bio }, 
      { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      const name = fullname.toLowerCase();
      
      return prisma.updateSuperStar({ where: { id: superStarId }, data: {
        fullname: name,
        title,
        image, 
        dateOfBirth,
        location,
        bio
      }});
    }
  }
};
