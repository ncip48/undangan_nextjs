import { NextRequest } from "next/server";
import { ResponseApiFail, ResponseApiSuccess } from "../utils/response";
import prisma from "@/lib/prisma";

interface WeddingInterface {
  id?: string;
  purchaseId: string;
  templateId: string;
  username: string;
  nama_mempelai_wanita: string;
  singkatan_wanita?: string;
  putri_ke: string;
  nama_ortu_wanita: string;
  nama_mempelai_pria: string;
  singkatan_pria?: string;
  putra_ke: string;
  nama_ortu_pria: string;
  tanggal_akad: string;
  jam_akad?: string;
  tanggal_resepsi: string;
  jam_resepsi?: string;
  alamat: string;
  link_google_maps: string;
}

export async function GET() {
  try {
    const weddings = await prisma.wedding.findMany({
      include: {
        gift: {
          orderBy: {
            createdAt: "asc",
          },
        },
        gallery: {
          orderBy: {
            createdAt: "asc",
          },
        },
        wish: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return ResponseApiSuccess("Wedding loaded successfully", weddings);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      purchaseId,
      templateId,
      username,
      nama_mempelai_wanita,
      singkatan_wanita,
      putri_ke,
      nama_ortu_wanita,
      nama_mempelai_pria,
      singkatan_pria,
      putra_ke,
      nama_ortu_pria,
      tanggal_akad,
      jam_akad,
      tanggal_resepsi,
      jam_resepsi,
      alamat,
      link_google_maps,
    }: WeddingInterface = await request.json();

    const wedding = await prisma.wedding.create({
      data: {
        purchaseId,
        templateId,
        username,
        nama_mempelai_wanita,
        singkatan_wanita,
        putri_ke,
        nama_ortu_wanita,
        nama_mempelai_pria,
        singkatan_pria,
        putra_ke,
        nama_ortu_pria,
        tanggal_akad: new Date(tanggal_akad),
        jam_akad,
        tanggal_resepsi: new Date(tanggal_resepsi),
        jam_resepsi,
        alamat,
        link_google_maps,
      },
    });

    return ResponseApiSuccess("Wedding successfully created", wedding);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      purchaseId,
      templateId,
      username,
      nama_mempelai_wanita,
      singkatan_wanita,
      putri_ke,
      nama_ortu_wanita,
      nama_mempelai_pria,
      singkatan_pria,
      putra_ke,
      nama_ortu_pria,
      tanggal_akad,
      jam_akad,
      tanggal_resepsi,
      jam_resepsi,
      alamat,
      link_google_maps,
    }: WeddingInterface = await request.json();

    const updateData: any = {
      purchaseId,
      templateId,
      username,
      nama_mempelai_wanita,
      singkatan_wanita,
      putri_ke,
      nama_ortu_wanita,
      nama_mempelai_pria,
      singkatan_pria,
      putra_ke,
      nama_ortu_pria,
      tanggal_akad: new Date(tanggal_akad),
      jam_akad,
      tanggal_resepsi: new Date(tanggal_resepsi),
      jam_resepsi,
      alamat,
      link_google_maps,
      updatedAt: new Date(),
    };

    const wedding = await prisma.wedding.update({
      where: {
        id: id,
      },
      include: {
        gift: {
          orderBy: {
            createdAt: "asc",
          },
        },
        gallery: {
          orderBy: {
            createdAt: "asc",
          },
        },
        wish: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      data: updateData,
    });

    return ResponseApiSuccess("Wedding successfully updated", wedding);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    await prisma.wedding.delete({
      where: {
        id,
      },
    });

    return ResponseApiSuccess("Wedding successfully deleted", null);
  } catch (error: any) {
    return ResponseApiFail(error.message);
  }
}
