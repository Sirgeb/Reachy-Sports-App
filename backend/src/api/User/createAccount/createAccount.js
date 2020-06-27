import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { firstname, lastname, email, avatar, facebookID, googleID } = args;

      const id = facebookID || googleID;
      let source;
      let user;

      const exists = await prisma.$exists.user({
        OR:[{ facebookID }, { googleID }]
      });

      const userAuthenticatedWith = (facebookID, googleID) => {
        if (facebookID) {
          source = 1;
          return { facebookID };
        }
        if (googleID) {
          source = 2;
          return { googleID }
        };
      }

      if (exists) {
        user = await prisma.updateUser({
          data: {
            firstname,
            lastname,
            email,
            avatar
          },
          where: userAuthenticatedWith(facebookID, googleID)
        });
        return {
          token: generateToken(id, source),
          userId: user.id 
        }
      }

      user = await prisma.createUser({
        firstname,
        lastname,
        email,
        avatar, 
        ...userAuthenticatedWith(facebookID, googleID)
      }); 
      return {
        token: generateToken(id, source),
        userId: user.id 
      }
    }
  }
}
