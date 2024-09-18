"use client";

import axiosInstance from "../instances";

export async function getTemplates() {
  try {
    const response = await axiosInstance.get(`/templates`);
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function createTemplate(formData: any) {
  try {
    const response = await axiosInstance.post(
      `/templates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function updateTemplate(formData: any) {
  try {
    const response = await axiosInstance.put(
      `/templates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteTemplate(id: string) {
  try {
    const response: any = await axiosInstance.delete(`/templates?id=${id}`);
    return response.success;
  } catch (error: any) {
    return null;
  }
}
