import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../../utils/response";
import prisma from "@/lib/prisma";
import { comparePassword } from "../../utils/password";
import jwt from "jsonwebtoken";

interface LoginInterface {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginInterface = await request.json();
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const compare = await comparePassword(password, user.password);
      if (compare) {
        if (!user.emailConfirmed) {
          return ResponseApiFail("Please verify email first", 400);
        } else {
          const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email,
          };

          //add JWT to response
          const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
          });

          return ResponseApiSuccess("Login successfully", {
            ...tokenData,
            token,
          });
        }
      } else {
        return ResponseApiFail("Password incorrect", 400);
      }
    } else {
      return ResponseApiFail("User not found", 404);
    }
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
