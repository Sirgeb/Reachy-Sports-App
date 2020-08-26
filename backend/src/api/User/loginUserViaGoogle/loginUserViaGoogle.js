import { prisma } from '../../../../generated/prisma-client';
import { Google, generateToken } from '../../../utils';

export default {
  Mutation: {
    loginUserViaGoogle: async (_, { code, domain }) => {
      if (code) {
        const { user } = await Google.logIn(code);

        if(!user) {
          throw new Error("Google login error");
        }

        //Name/Photo/Email Lists 
        const userNamesList = user.names && user.names.length ? user.names : null;
        const userPhotosList = user.photos && user.photos.length ? user.photos : null;
        const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;

        // User Display Name 
        const userName = userNamesList ? userNamesList[0].displayName : null;

        // User Id 
        const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source ? userNamesList[0].metadata.source.id : null;

        // User Avatar 
        const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

        // User Email
        const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

        if (!userId || !userName || !userAvatar || !userEmail) {
          throw new Error('Google login error');
        }

        // get user data
        const registeredUser = await prisma.user({
          googleID: userId
        });

        // check domain the user wants to access
        if (domain === "admin" && registeredUser.permission === "USER") {
          throw new Error('You are not permitted to use this domain');
        }

        const name = userName.split(" "); 
        if (registeredUser) {
          await prisma.updateUser({
            data: {
              firstname: name[0],
              lastname: name[1],
              email: userEmail,
              avatar: userAvatar 
            },
            where: {
              googleID: userId
            }
          });
        } else {
          await prisma.createUser({
            firstname: name[0],
            lastname: name[1],
            email: userEmail,
            avatar: userAvatar,
            googleID: userId
          }); 
        }

        const token = generateToken(userId, 2)
        return token;
      } 
    }
  }
};
