export interface WeddingInterface {
  id: string;
  purchaseId: string;
  templateId: string;
  username: string;
  nama_mempelai_wanita: string;
  singkatan_wanita: string;
  putri_ke: string;
  nama_ortu_wanita: string;
  nama_mempelai_pria: string;
  singkatan_pria: string;
  putra_ke: string;
  nama_ortu_pria: string;
  tanggal_akad: string;
  jam_akad: string;
  tanggal_resepsi: string;
  jam_resepsi: string;
  alamat: string;
  link_google_maps: string;
  cover?: string;
  isExpired: boolean;
  createdAt: string;
  updatedAt: string;
  template: Template;
  gift: Gift[];
  gallery: Gallery[];
  wish: Wish[];
}

export interface Template {
  id: string;
  name: string;
  path: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gift {
  id: string;
  weddingId: string;
  type: string;
  name: string;
  an: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gallery {
  id: string;
  weddingId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wish {
  id: string;
  weddingId: string;
  name: string;
  wish: string;
  createdAt: string;
  updatedAt: string;
}
