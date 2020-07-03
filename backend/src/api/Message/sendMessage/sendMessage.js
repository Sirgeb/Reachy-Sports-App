import { prisma } from '../../../../generated/prisma-client';
import { MESSAGE_FRAGMENT } from '../../../fragments';

export default {
  Mutation: { 
    sendMessage: async (_, { text, groupId }, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const isParticipant = await prisma.$exists.participant({
        groupId,
        AND: [{
          user: {
            id: request.user.id
          }
        }]
      });
      
      if (!isParticipant) throw new Error("Oops, you ain't a member of this group");

      return prisma.createMessage({
        text,
        user: {
          connect: {
            id: request.user.id
          }
        },
        group: {
          connect: {
            id: groupId
          }
        }
      }).$fragment(MESSAGE_FRAGMENT);
    }
  }
}
