import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const hashPassword = (password: string): string | null => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  } catch (e) {
    return null;
  }
};

export const comparePassword = (
  databasePassword: string,
  userPassword: string
): boolean => {
  try {
    const hashedPassword = bcrypt.compareSync(userPassword, databasePassword);
    return hashedPassword;
  } catch (e) {
    return false;
  }
};

export const generateAccessToken = (user: {
  sub: string;
  email: string;
  role: Role;
}) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "20m" });
};
export const generateRefreshToken = (user: {
  sub: string;
  sessionId: string;
}) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  try {
    let payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      sub: string;
      sessionId: string;
    };
    return payload;
  } catch (e) {
    return null;
  }
};

export const verifyAccessToken = (token: string) => {
  try {
    let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      sub: string;
      email: string;
      role: Role;
    };
    return payload;
  } catch (e) {
    return null;
  }
};
