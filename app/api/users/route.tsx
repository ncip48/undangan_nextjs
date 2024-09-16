import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import * as fs from "fs";
import { hashPassword } from "../utils/password";

interface UserInterface {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: number;
}

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return ResponseApiSuccess("Users loaded successfully", users);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, role }: UserInterface =
      await request.json();

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
        role,
      },
    });

    return ResponseApiSuccess("User successfully created", user);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, username, email, password, role }: UserInterface =
      await request.json();

    const updateData: any = {
      username,
      email,
      role,
      updatedAt: new Date(),
    };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return ResponseApiSuccess("User successfully updated", user);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("User successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
