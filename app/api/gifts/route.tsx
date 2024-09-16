import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import prisma from "@/lib/prisma";

interface GiftInterface {
  id?: string;
  weddingId: string;
  type: string;
  name: string;
  an?: string;
}

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      include: {
        wedding: true,
      },
    });
    return ResponseApiSuccess("Gift loaded successfully", gifts);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { weddingId, name, type, an }: GiftInterface = await request.json();

    const gift = await prisma.gift.create({
      data: {
        weddingId,
        name,
        type,
        an,
      },
      include: {
        wedding: true,
      },
    });

    return ResponseApiSuccess("Gift successfully created", gift);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, weddingId, name, type, an }: GiftInterface =
      await request.json();

    const updateData: any = {
      weddingId,
      name,
      type,
      an,
      updatedAt: new Date(),
    };

    const gift = await prisma.gift.update({
      where: {
        id: id,
      },
      include: { wedding: true },
      data: updateData,
    });

    return ResponseApiSuccess("Gift successfully updated", gift);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.gift.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("Gift successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
