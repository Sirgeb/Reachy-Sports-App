import { prisma } from "../../../generated/prisma-client";

export default {
  Group: {
    isParticipant: async ({ name }, __, { request }) => {
      return (await prisma.user({ id: request.user.id }).groups()).some(group => group.groupName === name);
    }
  }
}
