"use client";

import axiosInstance from "../instances";

export async function getWeddings() {
  try {
    const response = await axiosInstance.get(`/weddings`);
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function createWedding(data: any) {
  try {
    const response = await axiosInstance.post(`/weddings`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function updateWedding(data: any) {
  try {
    const response = await axiosInstance.put(`/weddings`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteWedding(id: string) {
  try {
    const response: any = await axiosInstance.delete(`/weddings?id=${id}`);
    return response.success;
  } catch (error: any) {
    return null;
  }
}
