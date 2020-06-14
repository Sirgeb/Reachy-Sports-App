import jwt from "jsonwebtoken";

export const generateToken = (id, source) => jwt.sign({ id, source }, process.env.JWT_SECRET);
