import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addParticipant: async (_, { groupId, groupName }, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const isParticipant = await prisma.$exists.participant({
        groupId,
        AND: [{
          user: {
            id: request.user.id
          }
        }]
      });
      
      if (isParticipant) {
        throw new Error("Sorry you're already a participant");
      }
      
      await prisma.createParticipant({ 
        groupId, 
        groupName,
        user: {
        connect: {
          id: request.user.id
        }
      }});

      const userGroups = await prisma.participants({
        where: {
          user: {
            id: request.user.id
          }
        }
      });

      const groupNames = [];

      userGroups.forEach(({ groupName }) => {
        groupNames.push(groupName);
      });

      return groupNames;
    }
  }
}
