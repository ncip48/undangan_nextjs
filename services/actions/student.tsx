"use client";

import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import { getSession, logout } from "@/app/lib";
import axios from "axios";

interface FormLoginProps {
  username: string;
  password: string;
}

export async function getStudents() {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`/api/students`, {
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

export async function createStudent(data: any) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const { nis, nisn, name, grade, sex, kelas } = data;
    const response = await axios.post(
      `/api/students`,
      {
        nis,
        nisn,
        name,
        grade,
        sex,
        kelas,
      },
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
      toast.success("Berhasil menambahkan siswa");
      return result.data[0];
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

export async function updateStudent(id: any, data: any) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const { nis, nisn, name, grade, sex, kelas } = data;
    const response = await axios.put(
      `/api/students`,
      {
        id,
        nis,
        nisn,
        name,
        grade,
        sex,
        kelas,
      },
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
      toast.success("Berhasil mengedit siswa");
      return result.data[0];
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

export async function deleteStudent(nis: any) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.delete(`/api/students?nis=${nis}`, {
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
      toast.success("Berhasil menghapus siswa");
      return result.data[0];
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

export async function getStudentByNIS(nis: string) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.get(`${baseUrl}/students/v1/nis/${nis}`, {
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

export async function importStudent(formData: any) {
  try {
    const storage = await getSession();
    const token = storage.user.token;
    const response = await axios.post(`/api/importStudent`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status !== 200) {
      toast.error(result.message);
      return null;
    } else {
      toast.success("Berhasil mengimport siswa");
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
