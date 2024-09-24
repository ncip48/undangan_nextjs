import prisma from "@/lib/prisma";
import { ResponseApiFail, ResponseApiSuccess } from "../../utils/response";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const weddings = await prisma.wedding.findFirst({
      where: {
        username,
      },
      include: {
        template: true,
        gift: {
          orderBy: {
            createdAt: "asc",
          },
        },
        gallery: {
          orderBy: {
            createdAt: "asc",
          },
        },
        wish: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!weddings) {
      return ResponseApiFail("Wedding not found", 404);
    }
    return ResponseApiSuccess("Wedding loaded successfully", weddings);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
