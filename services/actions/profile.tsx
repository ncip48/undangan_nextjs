"use client";

import axiosInstance from "../instances";

export async function getProfile() {
  try {
    const response = await axiosInstance.get(`/profile`);
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function updateProfile(data: any) {
  try {
    const response = await axiosInstance.put(`/profile`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}
