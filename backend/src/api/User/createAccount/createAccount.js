import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { firstname, lastname, email, avatar, facebookID, googleID } = args;

      await prisma.createUser({
        firstname,
        lastname,
        email,
        avatar,
        facebookID,
        googleID
      }); 

      return true;
    }
  }
}
