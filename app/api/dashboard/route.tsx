import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    const response = await axios.get(
      `${baseUrl}/attendances/home/statistik/harian?key=0`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = response.data;
    console.log(res);
    let result;
    if (res.data) {
      const rsd = res.data;
      console.log(rsd);
      result = {
        ...res,
        data: {
          tepatWaktu: rsd[1]?.data[0] ?? 0,
          terlambat: rsd[2]?.data[0] ?? 0,
          fullTime: rsd[0]?.data[0] ?? 0,
        },
      };
    } else {
      result = {
        ...res,
        data: {
          tepatWaktu: 0,
          terlambat: 0,
          fullTime: 0,
        },
      };
    }

    const resSiswa = await axios.get(`${baseUrl}/students/v1/show`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resultSiswa = resSiswa.data.data.length;

    result.data.totalSiswa = resultSiswa;

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
