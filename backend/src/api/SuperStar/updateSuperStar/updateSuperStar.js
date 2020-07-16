import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateSuperStar: async (_, 
      { superStarId, fullname, title, image, dateOfBirth, location,bio }, 
      { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);
      
      return prisma.updateSuperStar({ where: { id: superStarId }, data: {
        fullname,
        title,
        image, 
        dateOfBirth,
        location,
        bio
      }});
    }
  }
};
