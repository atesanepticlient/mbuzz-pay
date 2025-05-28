import { db } from "@/lib/db";

export const findUserByPlayerId = async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });
  return user;
};
