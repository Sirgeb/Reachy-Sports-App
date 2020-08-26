import { Google } from '../../../utils';

export default {
  Query: {
    getGoogleAuthUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Error: ${error.message}`)
      }
    }
  }
};
