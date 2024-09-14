import { NextRequest, NextResponse } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import { getAuth } from "../utils/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "../utils/password";

interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  description: string;
  includePrintout: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return ResponseApiSuccess("Products loaded successfully", products);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, price, description, includePrintout }: ProductInterface =
      await request.json();

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        includePrintout,
      },
    });

    return ResponseApiSuccess("Product successfully created", product);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, price, description, includePrintout }: ProductInterface =
      await request.json();

    const updateData: any = {
      name,
      price,
      description,
      includePrintout,
      updatedAt: new Date(),
    };

    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return ResponseApiSuccess("Product successfully updated", product);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("Product successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
