/* eslint-disable @next/next/no-img-element */
"use client";

import { formatRupiah } from "@/lib/currency";
import { getTemplates } from "@/services/actions/template";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import Image from "next/image";
import React, { useState } from "react";

const ITEMS = [
  {
    name: "Murce",
    price: 50000,
    features: {
      cover: false,
      fotoMempelai: false,
      sliderGaleri: false,
      rsvp: false,
    },
  },
  {
    name: "Elit Dikit",
    price: 100000,
    features: {
      cover: true,
      fotoMempelai: true,
      sliderGaleri: false,
      rsvp: false,
    },
  },
  {
    name: "Serba Lengkap",
    price: 150000,
    features: {
      cover: true,
      fotoMempelai: true,
      sliderGaleri: true,
      rsvp: true,
    },
  },
];

const PricingList = ({
  label,
  available,
}: {
  label: string;
  available: boolean;
}) => {
  return (
    <li className="flex items-center text-sm text-gray-500">
      {available ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          className="mr-3 bg-purple-100 fill-purple-600 rounded-full p-[3px]"
          viewBox="0 0 24 24"
        >
          <path
            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
            data-original="#000000"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          className="mr-3 bg-red-100 fill-red-600 rounded-full p-[3px]"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      )}
      {label}
    </li>
  );
};

const PricingCard = ({
  title,
  price,
  item,
}: {
  title: string;
  price: number;
  item: any;
}) => {
  return (
    <div className="bg-white shadow rounded-3xl p-6 hover:scale-105 transition-all duration-300">
      <h4 className="text-gray-800 text-lg mb-3">{title}</h4>
      <h3 className="text-3xl font-semibold ">
        {formatRupiah(price)}
        <sub className="text-gray-500 font-medium text-sm ml-1">/ bulan</sub>
      </h3>

      <hr className="my-6 border-gray-300" />

      <div>
        <ul className="space-y-4">
          <PricingList label="Kustomisasi URL" available />
          <PricingList label="Panel Share" available />
          <PricingList label="Custom Musik mp3" available />
          <PricingList label="Foto Cover" available={item.cover} />
          <PricingList label="Foto Mempelai" available={item.fotoMempelai} />
          <PricingList label="Slider Galeri" available={item.sliderGaleri} />
          <PricingList label="Ucapan/RSVP" available={item.rsvp} />
        </ul>

        <button
          onClick={() =>
            window.open(
              `https://wa.me/+6285888115315?text=Halo InvitasiDigi, saya ingin membeli template ${title}`,
              "_blank"
            )
          }
          className="w-full mt-6 px-4 py-2 text-sm tracking-wide bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-300 ease-in-out"
        >
          Pilih
        </button>
      </div>
    </div>
  );
};

function Page() {
  const [templates, setTemplates] = useState<any[]>([]);

  const getDataTemplates = async () => {
    const res = await getTemplates();
    setTemplates(res);
  };

  useEffectAfterMount(() => {
    getDataTemplates();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="navbar fixed top-0 left-0 w-full bg-orange-600 transition duration-300 ease-in-out z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="#" className="text-xl font-bold text-white">
            InvitasiDigi
          </a>
          <div>
            <a href="#features" className="text-white mx-4">
              Fitur
            </a>
            <a href="#templates" className="text-white mx-4">
              Template
            </a>
            <a href="#pricing" className="text-white mx-4">
              Harga
            </a>
            <a href="#contact" className="text-white mx-4">
              Kontak
            </a>
          </div>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <section className="bg-orange-600 text-white h-screen">
        <div className="container h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center items-start py-20">
            <h1 className="text-4xl font-bold">
              Selamat Datang di InvitasiDigi
            </h1>
            <p className="mt-4 text-lg">
              Jasa Undangan Digital yang Memudahkan Acara Pernikahan Anda
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block bg-white text-orange-600 py-2 px-6 rounded-full font-semibold"
            >
              Hubungi Kami
            </a>
          </div>
          <div className="hidden lg:block py-20">
            <Image
              src="/assets/hero.jpg"
              alt="Undangan Digital"
              height={1000}
              width={1000}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* <!-- Feature Section --> */}
      <section className="py-20" id="features">
        <div className="py-0 px-4 mx-auto max-w-screen-xl lg:px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Fitur Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Kustomisasi Mudah</h3>
              <p className="mt-2">
                Kustomisasi undangan sesuai keinginan Anda.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Berbagai Template</h3>
              <p className="mt-2">Pilih dari berbagai template yang menarik.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Pengiriman Cepat</h3>
              <p className="mt-2">Kirim undangan dalam hitungan detik.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Tampilan Responsif</h3>
              <p className="mt-2">
                Undangan tampil sempurna di semua perangkat.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 
    <!-- Template Section --> */}
      <section className="py-20 bg-gray-50" id="templates">
        <div className="py-0 px-4 mx-auto max-w-screen-xl lg:px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Template Undangan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates?.map((item: any, index: number) => {
              return (
                <div className="bg-white p-6 rounded-lg shadow-lg" key={index}>
                  <img
                    src={`/assets/${item.image}`}
                    alt={item.path}
                    // className="w-30 rounded-lg"
                    className="w-full h-48 object-cover rounded-lg"
                    // fill
                  />
                  <h3 className="font-semibold text-xl mt-4">{item.name}</h3>
                  <a
                    href={`/preview/${item.path}`}
                    className="mt-2 inline-block bg-orange-600 text-white py-2 px-4 rounded-full"
                    target="_blank"
                  >
                    Preview
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- Pricing Section --> */}
      <section id="pricing" className="px-4 py-20">
        <div className="max-w-5xl max-lg:max-w-3xl mx-auto">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
            <h2 className="text-3xl font-bold mb-4">Harga Kami</h2>
            <p className="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Berikut tabel harga yang ada di InvitasiDigi
            </p>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-sm:max-w-sm max-sm:mx-auto mt-0">
            {/* Pricing Card */}
            {ITEMS.map((item: any, index: number) => {
              return (
                <PricingCard
                  title={item.name}
                  price={item.price}
                  item={item.features}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- Contact Section --> */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Hubungi Kami</h2>
          <p className="mb-4">
            Untuk informasi lebih lanjut, silakan isi formulir di bawah ini.
          </p>
          <form className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Nama"
              className="block w-full p-3 mb-4 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="block w-full p-3 mb-4 border rounded"
            />
            <textarea
              placeholder="Pesan"
              className="block w-full p-3 mb-4 border rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-600 text-white py-2 px-4 rounded-full"
            >
              Kirim
            </button>
          </form>
        </div>
      </section>
      {/* <!-- Review Section --> */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
            <h2 className="text-3xl font-bold mb-4">Ulasan Pelanggan</h2>
            <p className="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Apa Kata Mereka Tentang Kami:
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div className="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>
            <div className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div className="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>
            <div className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div className="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Footer --> */}
      <footer className="py-6 bg-orange-600 text-white text-center">
        <p>&copy; 2023 InvitasiDigi. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}

export default Page;
