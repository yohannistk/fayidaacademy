import bcrypt from "bcrypt";

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
