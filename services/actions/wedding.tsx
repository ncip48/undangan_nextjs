"use server";

import axios from "axios";
import { redirect } from "next/navigation";

export async function getWeddingDetail(username: string) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/api/weddings/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    // console.log(result);
    if (!result.success) {
      return redirect("/");
    } else {
      return result.data;
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        return redirect("/");
      }
    }
    console.log(error.message);
    return;
  }
}
