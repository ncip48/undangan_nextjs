"use client";

import axios from "axios";
import { baseUrl } from "../constants";
import { loginServices } from "./login";
import toast from "react-hot-toast";
import { getSession, logout } from "@/app/lib";

export async function presentByNIS(nis: string) {
  try {
    const response = axios.post(
      `${baseUrl}/attendances/v1/login/nis/${nis}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await loginServices({
            username: "kocak",
            password: "password",
          })}`,
        },
      }
    );
    toast.promise(response, {
      loading: "Loading ...",
      success: (data) => {
        if (data.data.status !== 200) {
          //here you can that this will throw the error from the returned data. Usually it's treated as normal thing.
          throw new Error(`Statues code ${data.status}`);
        }
        return `${data?.data?.data[0]?.student?.name} berhasil absen masuk`;
      },
      error: (e) => {
        return `Uh oh, there was an error! ${e.message}`;
      },
    });
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
}

export async function presentOutByNISwithToken(nis: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.post(
      `api/present-out?nis=${nis}`,
      {},
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
      return null;
    } else {
      if (result.data[0] == null) {
        toast.error("Siswa tidak ditemukan");
        return null;
      }
      toast.success(`${result.data[0].student.name} berhasil absen pulang`);
      return `${result.data[0].student.name} berhasil absen pulang`;
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

export async function presentByNISwithToken(nis: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.post(
      `api/present?nis=${nis}`,
      {},
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
      return null;
    } else {
      if (result.data[0] == null) {
        toast.error("Siswa tidak ditemukan");
        return null;
      }
      toast.success(`${result.data[0].student.name} berhasil absen masuk`);
      return `${result.data[0].student.name} berhasil absen masuk`;
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
