import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    const response = await axios.get(`${baseUrl}/students/v1/show`, {
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

export async function POST(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    interface StudentData {
      nis: string;
      nisn: string;
      name: string;
      grade: string;
      sex: string;
      kelas: string;
    }
    const { nis, nisn, name, grade, sex, kelas }: StudentData =
      await request.json();
    const response = await axios.post(
      `${baseUrl}/students/v1/create`,
      {
        nis,
        nisn,
        name,
        grade,
        kelas,
        sex,
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

export async function PUT(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    interface StudentData {
      id: number;
      nis: string;
      nisn: string;
      name: string;
      grade: string;
      sex: string;
      kelas: string;
    }
    const { id, nis, nisn, name, grade, sex, kelas }: StudentData =
      await request.json();
    const response = await axios.put(
      `${baseUrl}/students/v1/${id}`,
      {
        nis,
        nisn,
        name,
        grade,
        kelas,
        sex,
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

export async function DELETE(request: NextRequest) {
  try {
    const token = request?.headers?.get("Authorization")?.split(" ")[1];
    //get the nis from ?nis=
    const nis = request.nextUrl.searchParams.get("nis");
    console.log("NIS", nis);
    const response = await axios.delete(`${baseUrl}/students/v1/nis/${nis}`, {
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
