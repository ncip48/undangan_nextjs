"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { WeddingInterface } from "@/interfaces/wedding";
import HijauSage from "@/app/wedding/[username]/components/HijauSage";

function Page({ params }: { params: { template: string } }) {
  const searchParams = useSearchParams();
  const { template } = params;
  const receiver = { to: "Bp Eko", at: "Ngawi" };
  const [loading, setLoading] = useState<boolean>(true);

  const data: WeddingInterface = {
    id: "ee66e4a0-b9e6-4ed6-8c69-6b85bfe625c7",
    purchaseId: "726a7f26-5b02-410e-86be-0983ce3c6cca",
    templateId: "b120eb4a-1868-462a-87ce-3ccbe1b1d952",
    username: "dwiherly",
    nama_mempelai_wanita: "Dwi Elok Nuraini S.Tr.Kom",
    singkatan_wanita: "Elok",
    putri_ke: "Kedua",
    nama_ortu_wanita: "Bapak Supriyadi & Ibu Umi Kabibah",
    nama_mempelai_pria: "Herly Chahya Putra A.Md.Kom",
    singkatan_pria: "Herly",
    putra_ke: "Pertama",
    nama_ortu_pria: "Bapak ??? & Ibu Elfi Laela",
    tanggal_akad: "2024-10-16T00:00:00.000Z",
    jam_akad: "09:00 - 11:00",
    tanggal_resepsi: "2024-10-16T00:00:00.000Z",
    jam_resepsi: "11:00 - Selesai",
    alamat: "Jl Raya Karas (FC Praktis), Magetan",
    link_google_maps: "-",
    cover: "",
    isExpired: false,
    createdAt: "2024-09-16T03:35:43.729Z",
    updatedAt: "2024-09-16T06:31:15.326Z",
    template: {
      id: "b120eb4a-1868-462a-87ce-3ccbe1b1d952",
      name: "Hijau Sage",
      path: "hijausage",
      image: "template_1727069843473.png",
      createdAt: "2024-09-14T15:39:55.307Z",
      updatedAt: "2024-09-23T05:37:23.467Z",
    },
    gift: [
      {
        id: "c96c21b8-0a1f-4515-bbb1-3e153a5ec8fd",
        weddingId: "ee66e4a0-b9e6-4ed6-8c69-6b85bfe625c7",
        type: "address",
        name: "Jl Raya Karas (FC Praktis), Magetan",
        an: "",
        createdAt: "2024-09-16T03:49:07.825Z",
        updatedAt: "2024-09-16T03:49:07.825Z",
      },
      {
        id: "448ead94-5507-4494-8779-ff8a8b064158",
        weddingId: "ee66e4a0-b9e6-4ed6-8c69-6b85bfe625c7",
        type: "bca",
        name: "7790441375",
        an: "Herly Chahya Putra",
        createdAt: "2024-09-16T03:51:32.471Z",
        updatedAt: "2024-09-16T03:51:32.471Z",
      },
    ],
    gallery: [
      {
        id: "43fcc75b-325c-4c32-b7ef-5550e88254c6",
        weddingId: "ee66e4a0-b9e6-4ed6-8c69-6b85bfe625c7",
        image: "asd",
        createdAt: "2024-09-25T08:50:32.000Z",
        updatedAt: "2024-09-25T08:50:32.000Z",
      },
    ],
    wish: [
      {
        id: "bd55309f-e7a0-4ca1-85f8-19279d7904fa",
        weddingId: "ee66e4a0-b9e6-4ed6-8c69-6b85bfe625c7",
        name: "Krisma",
        wish: "Samawa ges",
        createdAt: "2024-09-25T08:50:45.000Z",
        updatedAt: "2024-09-25T08:50:45.000Z",
      },
    ],
  };

  switch (template) {
    case "hijausage":
      return <HijauSage receiver={receiver} data={data} />;
    default:
      break;
  }
}

export default Page;
