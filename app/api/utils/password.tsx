const bcrypt = require("bcrypt");

export const hashPassword = async (plainText: string) => {
  return await bcrypt.hash(plainText, 10);
};

export const comparePassword = async (
  plainText: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainText, hashedPassword);
};
