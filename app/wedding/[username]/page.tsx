"use client";

import { getWeddingDetail } from "@/services/actions/wedding";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { Pacifico, Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });
// const myFont = localFont({ src: './my-font.woff2' })

function Page({ params }: { params: { username: string } }) {
  const searchParams = useSearchParams();
  const { username } = params;
  const to = searchParams.get("to");
  const at = searchParams.get("at");

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  //   const res = await getWeddingDetail(username);
  const getData = async () => {
    const res = await getWeddingDetail(username);

    setData(res);
  };

  useEffectAfterMount(() => {
    getData();
  }, []);

  return (
    <div className="bg-green-50">
      <div className="max-w-screen-md ml-auto mr-auto">
        {/* undangan cover */}
        <div
          className={`bg-green-50 ml-auto mr-auto absolute left-0 right-0 h-screen text-dark-900 p-4 transition-opacity ease-in-out delay-150 duration-300 ${
            !open ? "opacity-100 z-50" : "opacity-0 z-0"
          }`}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-center">The Wedding of</h1>
            <p
              className={`${pacifico.className} text-center mt-10 text-4xl text-green-500`}
            >
              {data?.singkatan_wanita} & {data?.singkatan_pria}
            </p>
            <p className="text-center mt-20 mb-10">Kpd Bpk/Ibu/Saudara/i</p>
            <p className="font-bold text-center">{to}</p>
            <p className="mb-5 font-bold text-center">{at}</p>
            <button
              onClick={() => setOpen(true)}
              className="animate-bounce bg-blue-800 text-white rounded-full px-3 py-2 text-xs mt-10"
            >
              Buka Undangan
            </button>
          </div>
        </div>
        {/* end undangan cover */}
        {/* undangan isi */}
        <div className="bg-blue-100 p-4 relative">
          <button className="p-10">Halooo</button>
        </div>
        {/* end undangan isi */}
      </div>
    </div>
  );
}

export default Page;
