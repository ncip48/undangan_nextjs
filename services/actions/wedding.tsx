import { logout } from "@/app/lib";
import axios from "axios";

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
    console.log(result);
    if (!result.success) {
      return null;
    } else {
      return result.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 401) {
        await logout();
        return;
      }
    }
    console.log(error.message);
    return;
  }
}
