"use client";

import { getWeddingDetail } from "@/services/actions/wedding";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { CalendarIcon, GiftIcon } from "@heroicons/react/24/solid";
import {
  Italiana,
  Licorice,
  Lobster,
  Mea_Culpa,
  Pacifico,
  Poppins,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });
const italiana = Italiana({ weight: ["400"], subsets: ["latin"] });
const licorice = Licorice({ weight: ["400"], subsets: ["latin"] });
const meaCulpa = Mea_Culpa({ weight: ["400"], subsets: ["latin"] });
const lobster = Lobster({ weight: ["400"], subsets: ["latin"] });
// const myFont = localFont({ src: './my-font.woff2' })

const MempelaiSection = ({
  type,
  nama,
  ke,
  nama_ortu,
  isOpen,
}: {
  type: number;
  nama: string;
  ke: string;
  nama_ortu: string;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`${isOpen ? "animate-zoomin" : ""} flex flex-col items-center`}
    >
      <Image
        src={`/assets/templates/t1/${type == 0 ? "mw.png" : "mp.png"}`}
        alt="mw"
        height={206}
        width={169}
        className=" mx-4"
      />
      <p
        className={`${licorice.className} text-center text-[30px] text-[#996A32] animate-zoomin`}
      >
        {nama}
      </p>
      <p className={`${poppins.className} text-[12px] text-black`}>
        Putri {ke} dari {nama_ortu}
      </p>
    </div>
  );
};

const MenuButton = ({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: any;
  onClick: any;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      {icon}
      <p className="text-[7px]">{name}</p>
    </div>
  );
};

const AcaraSection = ({
  type,
  tanggal,
  jam,
  alamat,
}: {
  type: number;
  tanggal: string;
  jam: string;
  alamat: string;
}) => {
  const parsedDate = new Date(tanggal);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = parsedDate.toLocaleDateString("id-ID", options);
  return (
    <div className="flex flex-col items-center">
      <h1 className={`${lobster.className} text-[#336546] text-[28px]`}>
        {type === 0 ? "Akad Nikah" : "Resepsi"}
      </h1>
      <p className="text-black text-[14px]">{formattedDate}</p>
      <p className="text-black text-[14px]">{jam}</p>
      <p className="text-black text-[14px]">{alamat}</p>
    </div>
  );
};

const Countdown = ({ number, label }: { number: number; label: string }) => {
  return (
    <div className="bg-[#996A32] rounded-md px-[12px] py-[6px] w-[56px]">
      <h1 className={`${lobster.className} text-white text-[24px] text-center`}>
        {number}
      </h1>
      <h1 className={`${lobster.className} text-white text-[14px] text-center`}>
        {label}
      </h1>
    </div>
  );
};

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
    document.title = `Pernikahan ${res?.singkatan_wanita} & ${res?.singkatan_pria}`;
  };

  useEffectAfterMount(() => {
    getData();
  }, []);

  const refMempelai: any = useRef(null);
  const refAcara: any = useRef(null);
  const refGift: any = useRef(null);
  const scrollToMempelai = () => refMempelai.current.scrollIntoView();
  const scrollToAcara = () => refAcara.current.scrollIntoView();
  const scrollToGift = () => refGift.current.scrollIntoView();

  return (
    <div className="bg-green-50">
      <div className="max-w-screen-md ml-auto mr-auto">
        {
          !open ? (
            <>
              {/* undangan cover */}
              {/* daun */}
              <div className={open ? "animate-fadeout" : ""}>
                <Image
                  src="/assets/templates/t1/daun1.png"
                  alt="daun1"
                  height={122}
                  width={122}
                  className="absolute z-[99] right-0 animate-zoomInTopRight"
                />
                <Image
                  src="/assets/templates/t1/daun2.png"
                  alt="daun2"
                  height={180}
                  width={180}
                  className="absolute z-[99] ml-auto mr-auto left-0 right-0 top-[40px] animate-zoomin"
                />
                <Image
                  src="/assets/templates/t1/daun3.png"
                  alt="daun3"
                  height={141}
                  width={83}
                  className="absolute z-[99] left-0 top-[162px] animate-zoomInRight"
                />
                <Image
                  src="/assets/templates/t1/daun4.png"
                  alt="daun4"
                  height={129}
                  width={63}
                  className="absolute z-[99] right-0 top-[287px] animate-zoomInLeft"
                />
                <Image
                  src="/assets/templates/t1/daun5.png"
                  alt="daun5"
                  height={150}
                  width={90}
                  className="absolute z-[99] left-0 bottom-0 animate-zoomInBotoomLeft"
                />
                <Image
                  src="/assets/templates/t1/daun6.png"
                  alt="daun6"
                  height={150}
                  width={90}
                  className="absolute z-[99] right-0 bottom-0 animate-zoomInBotoomRight"
                />
              </div>
              {/* end daun */}
              <div
                className={`bg-green-50 ml-auto mr-auto left-0 right-0 h-screen text-dark-900 p-4 transition-opacity ease-in-out delay-150 duration-300 ${
                  !open ? "opacity-100 z-50" : "opacity-0 z-0"
                } bg-white`}
              >
                <div className="h-full flex flex-col items-center animate-fadeInBounceLeft">
                  <h1
                    className={`${italiana.className} text-center mt-6 uppercase text-[20px]`}
                  >
                    The Wedding of
                  </h1>
                  <p
                    className={`${licorice.className} text-center mt-2 text-[60px] text-[#996A32] animate-zoomin`}
                  >
                    {data?.singkatan_wanita} & {data?.singkatan_pria}
                  </p>
                  <Image
                    alt="il"
                    width={387}
                    height={387}
                    className="mt-10 animate-zoomin"
                    src="/assets/templates/t1/il.png"
                  />
                  <div className="bg-gradient-to-r from-[#d5e0db] to-[#ede0d5] px-10 rounded-lg py-5 mt-5 animate-zoomin">
                    <p className="text-center mb-5">Kpd Bpk/Ibu/Saudara/i</p>
                    <p className="font-bold text-center">{to}</p>
                    <p className="font-bold text-center">{at}</p>
                  </div>
                  <div className="animate-fadein">
                    <button
                      onClick={() => setOpen(true)}
                      className="animate-bounce bg-[#336546] text-white rounded-full px-3 py-2 text-xs mt-10"
                    >
                      Buka Undangan
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // {/* end undangan cover */}
            // {/* undangan isi */}
            <div className="bg-white relative">
              <div ref={refMempelai}>
                {open && (
                  <>
                    <Image
                      src="/assets/templates/t1/isiatas.png"
                      alt="isiatas"
                      height={104}
                      width={390}
                      className="animate-fadeindown w-full"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi1.png"
                      alt="daunisi1"
                      height={177}
                      width={69}
                      className="absolute z-[99] animate-zoomInRight mt-40"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi2.png"
                      alt="daunisi2"
                      height={177}
                      width={69}
                      className="absolute z-[99] right-0 animate-zoomInLeft mt-[28rem]"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi3.png"
                      alt="daunisi3"
                      height={187}
                      width={130}
                      className="absolute z-[99] left-0 animate-zoomInRight mt-[44.5rem]"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi4.png"
                      alt="daunisi4"
                      height={187}
                      width={130}
                      className="absolute z-[99] right-0 animate-zoomInLeft mt-[44.5rem]"
                    />
                    {/* fab */}
                    <div className="flex flex-col z-[99] bg-[#d5c3ac] rounded-full px-2 py-2 fixed bottom-0 top-0 mt-auto mb-auto h-fit right-0 m-4 gap-10">
                      <MenuButton
                        name="Mempelai"
                        onClick={scrollToMempelai}
                        icon={<UserGroupIcon className="h-6" />}
                      />
                      <MenuButton
                        name="Acara"
                        onClick={scrollToAcara}
                        icon={<CalendarIcon className="h-6" />}
                      />
                      <MenuButton
                        name="Gift"
                        onClick={scrollToGift}
                        icon={<GiftIcon className="h-6" />}
                      />
                    </div>
                    {/* end fab */}
                  </>
                )}
                <div className="p-4 flex flex-col items-center">
                  <p
                    className={`${
                      poppins.className
                    } text-[12px] text-black text-center ${
                      open ? "animate-zoomin" : ""
                    } mb-4`}
                  >
                    “Dan segala sesuatunya Kami ciptakan
                    <br /> berpasang-pasangan agar kamu <br /> mengingat
                    kebesaran Allah”. <br />
                    (QS. Adz Dzariyaat, 51: 49)
                  </p>
                  <MempelaiSection
                    type={0}
                    nama={data?.nama_mempelai_wanita}
                    ke={data?.putri_ke}
                    nama_ortu={data?.nama_ortu_wanita}
                    isOpen={open}
                  />
                  <p
                    className={`${
                      meaCulpa.className
                    } text-[20px] text-black my-3 ${
                      open ? "animate-zoomin" : ""
                    } `}
                  >
                    dengan
                  </p>
                  <MempelaiSection
                    type={1}
                    nama={data?.nama_mempelai_pria}
                    ke={data?.putra_ke}
                    nama_ortu={data?.nama_ortu_pria}
                    isOpen={open}
                  />
                </div>
              </div>
              <div
                ref={refAcara}
                className="bg-white relative mt-[221px] pb-[219px]"
              >
                <AcaraSection
                  type={0}
                  tanggal={data?.tanggal_akad}
                  jam={data?.jam_akad}
                  alamat={data?.alamat}
                />
                <div className="mt-14" />
                <AcaraSection
                  type={1}
                  tanggal={data?.tanggal_akad}
                  jam={data?.jam_akad}
                  alamat={data?.alamat}
                />
                <div className="flex gap-5 justify-center mt-[62px]">
                  <Countdown number={10} label="Hari" />
                  <Countdown number={6} label="Jam" />
                  <Countdown number={55} label="Menit" />
                  <Countdown number={33} label="Detik" />
                </div>
              </div>
            </div>
          )
          // {/* end undangan isi */}
        }
      </div>
    </div>
  );
}

export default Page;
