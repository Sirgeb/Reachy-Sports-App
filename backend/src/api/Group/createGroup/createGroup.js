import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createGroup: async (_, { name, title, icon, route }, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);

      const exists = await prisma.$exists.group({ name });
      
      if (exists) {
        throw new Error("Group already exist");
      }

      await prisma.createGroup({
        name,
        title,
        icon,
        route
      });

      return true;
    }
  }
}
