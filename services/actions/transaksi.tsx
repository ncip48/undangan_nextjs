"use client";

import axiosInstance from "../instances";

export async function getTransactions() {
  try {
    const response = await axiosInstance.get(`/purchases`);
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function createTransaction(data: any) {
  try {
    const response = await axiosInstance.post(`/purchases`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function updateTransaction(data: any) {
  try {
    const response = await axiosInstance.put(`/purchases`, { ...data });
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteTransaction(id: string) {
  try {
    const response: any = await axiosInstance.delete(`/purchases?id=${id}`);
    return response.success;
  } catch (error: any) {
    return null;
  }
}
