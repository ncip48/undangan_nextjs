import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as any;

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = file.name.split(".").pop();
    const filename = `cover_${Date.now()}.${extension}`;

    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer
    );

    const imageRes = {
      createdAt: new Date(),
      file: filename,
    };

    return ResponseApiSuccess("Image successfully uploaded", imageRes);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
