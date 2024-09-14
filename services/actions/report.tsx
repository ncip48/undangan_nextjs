"use client";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession, logout } from "@/app/lib";
import axios from "axios";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getAttendances() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/attendances/v1/show`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return [];
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

export async function getAttendanceToday() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/attendances/v1/today`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return [];
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

export async function getAttendanceRange(
  dateStart: string,
  dateEnd: string,
  idStudent: string = "",
  kelas: string = ""
) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(
      `/api/reports?start=${dateStart}&end=${dateEnd}&idStudent=${idStudent}&kelas=${kelas}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return [];
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

export async function printAttendanceRange2(
  dateStart: string,
  dateEnd: string
) {
  const storage = await getSession();
  const token = storage.user.token;
  const response = await fetch(
    `${baseUrl}/attendances/generatePdf?start=${dateStart}T00:00:00&end=${dateEnd}T00:00:00`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        /* your POST data */
      }),
    }
  );

  return response;
}
export async function printAttendanceRange(dateStart: string, dateEnd: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.post(
      `/api/pdf?start=${dateStart}&end=${dateEnd}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = response.data;
    return result.data;
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

export async function printAttendanceRange3(
  dateStart: string,
  dateEnd: string,
  kelas: string = "",
  nis: string = "",
  tipe: string = ""
) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(
      `${baseUrl}/attendances/generatePdf?start=${dateStart}&end=${dateEnd}&nis=${nis}&kelas=${kelas}&tipe=${tipe}`,
      {
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    const contentType =
      response.headers["content-type"] || "application/octet-stream";

    // Create a new response with the binary data
    const binaryStream = response.data;

    return binaryStream;
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
