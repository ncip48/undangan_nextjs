import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import * as fs from "fs";

interface TemplateInterface {
  id?: string;
  name: string;
  path: string;
  image: string;
}

export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return ResponseApiSuccess("Templates loaded successfully", templates);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const pathname = formData.get("path") as string;
    const image = formData.get("image") as any;

    const buffer = Buffer.from(await image.arrayBuffer());
    const extension = image.name.split(".").pop();
    const filename = `template_${Date.now()}.${extension}`;

    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer
    );

    const template = await prisma.template.create({
      data: {
        name,
        path: pathname,
        image: filename,
      },
    });

    return ResponseApiSuccess("Template successfully created", template);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const pathname = formData.get("path") as string;
    const image = formData.get("image") as any;

    const updateData: any = {
      name,
      path: pathname,
      updatedAt: new Date(),
    };

    if (image) {
      const oldImage = await prisma.template.findUnique({
        where: {
          id: id,
        },
        select: {
          image: true,
        },
      });
      if (oldImage && oldImage.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public/assets/" + oldImage.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      const buffer: any = Buffer.from(await image.arrayBuffer());
      const extension: any = image.name.split(".").pop();
      const filename = `template_${Date.now()}.${extension}`;
      await writeFile(
        path.join(process.cwd(), "public/assets/" + filename),
        buffer
      );
      updateData.image = filename;
    }

    const template = await prisma.template.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return ResponseApiSuccess("Template successfully updated", template);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.template.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("Template successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
