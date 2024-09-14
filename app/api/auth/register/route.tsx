import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../../utils/response";
import prisma from "@/lib/prisma";
import { hashPassword } from "../../utils/password";

interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password }: RegisterInterface =
      await request.json();

    const checkUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUsername) {
      return ResponseApiFail("Username already taken", 400);
    }

    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return ResponseApiFail("Email already taken", 400);
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    });

    return ResponseApiSuccess("Register successfully", user);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
