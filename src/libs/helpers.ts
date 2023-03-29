import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (password: string, savedPassword: string) =>
  await bcrypt.compare(password, savedPassword);
