import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import { getAuth } from "../utils/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "../utils/password";

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuth(request);
    return ResponseApiSuccess("Profile loaded successfully", auth);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  interface UpdateProfileInterface {
    username: string;
    email: string;
    password?: string;
  }

  try {
    const auth = await getAuth(request);
    const { username, email, password }: UpdateProfileInterface =
      await request.json();

    const updateData: any = {
      username,
      email,
      updatedAt: new Date(),
    };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: {
        id: auth?.id,
      },
      data: updateData,
    });

    return ResponseApiSuccess("Profile successfully updated", user);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
