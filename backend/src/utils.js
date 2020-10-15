import jwt from "jsonwebtoken";
import { google } from 'googleapis';
import axios from 'axios';

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}`
);

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }),
  logIn: async (code) => {
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos'
    });

    return { user: data };
  }
}

export const generateToken = (id, source) => jwt.sign({ id, source }, process.env.JWT_SECRET);

export const sendPushNotification = async (expoToken, title, message) => {
  await axios.post(
    "https://exp.host/--/api/v2/push/send",
    {
      to: expoToken,
      title,
      body: message
    }
  )
}