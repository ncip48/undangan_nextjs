"use client";

import axiosInstance from "../instances";

export async function getUsers() {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function createUser(data: any) {
  try {
    const response = await axiosInstance.post(`/users`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function updateUser(data: any) {
  try {
    const response = await axiosInstance.put(`/users`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const response: any = await axiosInstance.delete(`/users?id=${id}`);
    return response.success;
  } catch (error: any) {
    return null;
  }
}
