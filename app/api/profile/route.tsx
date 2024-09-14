import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    console.log(token);
    const response = await axios.get(`${baseUrl}/v1/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
