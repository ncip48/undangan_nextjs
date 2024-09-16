import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import prisma from "@/lib/prisma";

interface PurchaseInterface {
  id?: string;
  name: string;
  total: number;
}

export async function GET(request: NextRequest) {
  try {
    const purchases = await prisma.purchase.findMany();
    return ResponseApiSuccess("Purchase loaded successfully", purchases);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, total }: PurchaseInterface = await request.json();

    const purchase = await prisma.purchase.create({
      data: {
        name,
        total,
      },
    });

    return ResponseApiSuccess("Purchase successfully created", purchase);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, total }: PurchaseInterface = await request.json();

    const updateData: any = {
      name,
      total,
      updatedAt: new Date(),
    };

    const purchase = await prisma.purchase.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return ResponseApiSuccess("Purchase successfully updated", purchase);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.purchase.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("Purchase successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
