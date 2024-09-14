import { getSession, logout } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req?.headers?.get("Authorization")?.split(" ")[1];
    const dateStart = req.nextUrl.searchParams.get("start");
    const dateEnd = req.nextUrl.searchParams.get("end");
    const idStudent = req.nextUrl.searchParams.get("idStudent");
    const kelas = req.nextUrl.searchParams.get("kelas");
    let response;

    if (idStudent) {
      response = await axios.get(
        `${baseUrl}/attendances/v1/${idStudent}/range?start=${dateStart}&end=${dateEnd}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await axios.get(
        `${baseUrl}/attendances/v1/range?start=${dateStart}&end=${dateEnd}&kelas=${kelas}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    const result = response?.data;
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
