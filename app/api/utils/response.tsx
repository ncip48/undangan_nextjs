import { NextResponse } from "next/server";

export const ResponseApiSuccess = (message: string, data: any) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: 200 }
  );
};

export const ResponseApiFail = (message: string, code: number = 500) => {
  let statusCode = code;
  let msg = message;
  if (message == "invalid signature" || message.includes("jwt must be")) {
    statusCode = 401;
    message = "Unauthorized";
  }
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
    },
    { status: statusCode }
  );
};
