import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getAuth = async (request: NextRequest) => {
  const token: any = request?.headers?.get("Authorization")?.split(" ")[1];
  const decoded: any = await jwt.verify(token, process.env.TOKEN_SECRET!);
  const id = decoded.id;

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      emailConfirmed: true,
    },
  });

  return user;
};
