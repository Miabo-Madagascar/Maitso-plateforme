import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, storedHashedPassword: string): Promise<boolean> {
  const hashed_password = await hashPassword(password);
  return bcrypt.compare(hashed_password, storedHashedPassword)
};