import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { firstname, lastname, email, picture, facebookID, googleID } = args;

      const id = facebookID || googleID;

      const exists = await prisma.$exists.user({
        OR:[{ facebookID }, { googleID }]
      });

      const userAuthenticatedWith = (facebookID, googleID) => {
        if (facebookID) return { facebookID };
        if (googleID) return { googleID };
      }

      if (exists) {
        await prisma.updateUser({
          data: {
            firstname,
            lastname,
            email,
            picture
          },
          where: userAuthenticatedWith(facebookID, googleID)
        });
        return generateToken(id);
      }

      await prisma.createUser({
        firstname,
        lastname,
        email,
        picture,
        facebookID,
        googleID
      }); 
      return generateToken(id);
    }
  }
}
