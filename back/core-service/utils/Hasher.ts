import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
  // const hashed = await bcrypt.hash(password, saltRounds);
  // return hashed;
};

export async function comparePassword(password: string, storedHashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, storedHashedPassword);
};
