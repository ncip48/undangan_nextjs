"use client";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function loginServices(form: FormLoginProps) {
  const response = await fetch(`${baseUrl}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const result = await response.json();
  if (result.status !== 200) {
    toast.error(result.message);
    return null;
  } else {
    return result.data[0];
  }
}
