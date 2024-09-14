import { getSession } from "@/app/lib";
import { baseUrl } from "@/services/constants";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req?.headers?.get("Authorization")?.split(" ")[1];
    const dateStart = req.nextUrl.searchParams.get("start");
    const dateEnd = req.nextUrl.searchParams.get("end");
    const nis = req.nextUrl.searchParams.get("nis");
    const kelas = req.nextUrl.searchParams.get("kelas");
    const tipe = req.nextUrl.searchParams.get("tipe");
    const response = await axios.get(
      `${baseUrl}/attendances/generatePdf?start=${dateStart}&end=${dateEnd}&nis=${nis}&kelas=${kelas}&tipe=${tipe}`,
      {
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    const result = response.data;

    // return new NextResponse(result, {
    //   status: 200,
    //   headers: new Headers({
    //     "content-disposition": `attachment; filename=test.pdf`,
    //     "content-type": "application/pdf",
    //   }),
    // });

    // Get the content type from the external API response
    const contentType =
      response.headers["content-type"] || "application/octet-stream";

    // Create a new response with the binary data
    const binaryStream = response.data;

    return new NextResponse(binaryStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": 'inline; filename="file.pdf"',
      },
      status: 200,
    });
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
