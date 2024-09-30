/* eslint-disable @next/next/no-img-element */
"use client";

import { getTemplates } from "@/services/actions/template";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import Image from "next/image";
import React, { useState } from "react";

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
      <nav className="navbar fixed top-0 left-0 w-full bg-blue-600 transition duration-300 ease-in-out z-50">
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
      <section className="bg-blue-600 text-white h-screen">
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
              className="mt-8 inline-block bg-white text-blue-600 py-2 px-6 rounded-full font-semibold"
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
        <div className="container mx-auto text-center">
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
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Template Undangan</h2>
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
                    className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded-full"
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
      <section className="py-20" id="pricing">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Harga Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Paket Basic</h3>
              <p className="text-2xl font-bold mt-2">Rp 200.000</p>
              <p className="mt-4">Cocok untuk acara kecil.</p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full"
              >
                Pilih
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform scale-105">
              <h3 className="font-semibold text-xl">Paket Pro</h3>
              <p className="text-3xl font-bold mt-2">Rp 400.000</p>
              <p className="mt-4">Termasuk semua fitur premium.</p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full"
              >
                Pilih
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">Paket Premium</h3>
              <p className="text-2xl font-bold mt-2">Rp 600.000</p>
              <p className="mt-4">Fitur lengkap untuk acara besar.</p>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full"
              >
                Pilih
              </a>
            </div>
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
              className="bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              Kirim
            </button>
          </form>
        </div>
      </section>
      {/* <!-- Review Section --> */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Ulasan Pelanggan</h2>
          <p className="mb-4">Apa kata mereka tentang kami:</p>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>
                {` "Undangan digital yang sangat membantu! Kustomisasi mudah dan
                cepat!"`}
              </p>
              <p className="mt-4 font-semibold">- Andi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>
                {`"Template yang menarik dan beragam. Sangat puas dengan layanan
                ini!"`}
              </p>
              <p className="mt-4 font-semibold">- Budi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>
                {`"Harga yang terjangkau dengan fitur lengkap. Sangat
                direkomendasikan!"`}
              </p>
              <p className="mt-4 font-semibold">- Citra</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Footer --> */}
      <footer className="py-6 bg-blue-600 text-white text-center">
        <p>&copy; 2023 InvitasiDigi. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}

export default Page;
