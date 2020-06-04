import jwt from "jsonwebtoken";

export const generateToken = (id, source) => jwt.sign({ id, source }, process.env.JWT_SECRET);

export const userAuthenticatedWith = (facebookID, googleID) => {
  if (facebookID) {
    return { facebookID };
  }
  if (googleID) {
    return { googleID }
  };
}