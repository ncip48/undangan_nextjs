import { getSession, logout } from "@/app/lib";
import axios from "axios";
import toast from "react-hot-toast";

export async function getStatistics() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`/api/dashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
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
    toast.error(error.message);
    return;
  }
}
