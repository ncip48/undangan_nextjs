import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
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
    return ResponseApiSuccess("Profile loaded", user);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    interface ProfileData {
      name: string;
      username: string;
      password: string;
      phoneNumber: string;
    }
    const { name, phoneNumber, username, password }: ProfileData =
      await request.json();
    const response = await axios.put(
      `${baseUrl}/v1/user/`,
      {
        name,
        phoneNumber,
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = response.data;
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        return NextResponse.json(
          {
            message: "unauthorized",
          },
          { status: error.response.status }
        );
      } else {
        return NextResponse.json(
          {
            message: error.message,
          },
          { status: error.response.status }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
