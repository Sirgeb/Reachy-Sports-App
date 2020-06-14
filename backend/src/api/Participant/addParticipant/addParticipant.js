import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addParticipant: async (_, { groupId }, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const isParticipant = await prisma.$exists.participant({
        groupId,
        AND: [{
          user: {
            id: request.user.id
          }
        }]
      });
      
      if (isParticipant) throw new Error("Sorry you're already a participant");
      
      await prisma.createParticipant({ groupId, user: {
        connect: {
          id: request.user.id
        }
      }});

      return true;
    }
  }
}
