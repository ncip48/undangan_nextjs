import {
  CalendarIcon,
  GiftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  Italiana,
  Licorice,
  Lobster,
  Mea_Culpa,
  Poppins,
} from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";

// import aos styles
import "aos/dist/aos.css";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
// const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });
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
    <div className={`flex flex-col items-center`} data-aos="zoom-in">
      <Image
        src={`/assets/templates/t1/${type == 0 ? "mw.png" : "mp.png"}`}
        alt="mw"
        height={206}
        width={169}
        className=" mx-4"
      />
      <p
        className={`${licorice.className} text-center text-[30px] text-[#996A32]`}
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
    <div className="flex flex-col items-center" data-aos="zoom-in">
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

function HijauSage({
  receiver,
  data,
}: {
  receiver: { at?: string; to?: string };
  data: any;
}) {
  const refMempelai: any = useRef(null);
  const refAcara: any = useRef(null);
  const refGift: any = useRef(null);
  const scrollToMempelai = () => refMempelai.current.scrollIntoView();
  const scrollToAcara = () => refAcara.current.scrollIntoView();
  const scrollToGift = () => refGift.current.scrollIntoView();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-green-50">
      <div className="max-w-screen-md ml-auto mr-auto">
        {
          !open ? (
            <>
              {/* undangan cover */}

              <div className="h-screen relative bg-white text-black flex flex-col items-center">
                {/* daun */}
                <>
                  <Image
                    src="/assets/templates/t1/daun1.png"
                    alt="daun1"
                    height={122}
                    width={122}
                    className="absolute z-[99] right-0"
                    data-aos="fade-down-left"
                  />
                  <Image
                    src="/assets/templates/t1/daun2.png"
                    alt="daun2"
                    height={180}
                    width={180}
                    className="absolute z-[99] ml-auto mr-auto left-0 right-0 top-[40px]"
                    data-aos="zoom-in"
                  />
                  <Image
                    src="/assets/templates/t1/daun3.png"
                    alt="daun3"
                    height={141}
                    width={83}
                    className="absolute z-[99] left-0 top-[162px]"
                    data-aos="zoom-in-right"
                  />
                  <Image
                    src="/assets/templates/t1/daun4.png"
                    alt="daun4"
                    height={129}
                    width={63}
                    className="absolute z-[99] right-0 top-[287px]"
                    data-aos="zoom-in-left"
                  />
                  <Image
                    src="/assets/templates/t1/daun5.png"
                    alt="daun5"
                    height={150}
                    width={90}
                    className="absolute z-[99] left-0 bottom-0"
                    data-aos="fade-up-right"
                  />
                  <Image
                    src="/assets/templates/t1/daun6.png"
                    alt="daun6"
                    height={150}
                    width={90}
                    className="absolute z-[99] right-0 bottom-0"
                    data-aos="fade-up-left"
                  />
                </>
                {/* end daun */}
                <h1
                  className={`${italiana.className} text-center mt-6 uppercase text-[20px]`}
                >
                  The Wedding of
                </h1>
                <p
                  className={`${licorice.className} text-center mt-2 text-[60px] text-[#996A32]`}
                  data-aos="zoom-in"
                >
                  {data?.singkatan_wanita} & {data?.singkatan_pria}
                </p>
                <Image
                  alt="il"
                  width={387}
                  height={387}
                  className="mt-10"
                  data-aos="zoom-in"
                  src="/assets/templates/t1/il.png"
                />
                <div
                  className="bg-gradient-to-r from-[#d5e0db] to-[#ede0d5] px-10 rounded-lg py-5 mt-5"
                  data-aos="zoom-in"
                >
                  <p className="text-center mb-5">Kpd Bpk/Ibu/Saudara/i</p>
                  <p className="font-bold text-center">{receiver.to}</p>
                  <p className="font-bold text-center">{receiver.at}</p>
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
                      className="w-full"
                      data-aos="fade-down"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi1.png"
                      alt="daunisi1"
                      height={177}
                      width={69}
                      className="absolute z-[99] mt-40"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi2.png"
                      alt="daunisi2"
                      height={177}
                      width={69}
                      className="absolute z-[99] right-0 mt-[28rem]"
                      data-aos="zoom-in-left"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi3.png"
                      alt="daunisi3"
                      height={187}
                      width={130}
                      className="absolute z-[99] left-0 mt-[44.5rem]"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi4.png"
                      alt="daunisi4"
                      height={187}
                      width={130}
                      className="absolute z-[99] right-0 animate-zoomInLeft mt-[44.5rem]"
                      data-aos="zoom-in-left"
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
                    className={`${poppins.className} text-[12px] text-black text-center mb-4`}
                    data-aos="zoom-in"
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
                    className={`${meaCulpa.className} text-[20px] text-black my-3  `}
                    data-aos="zoom-in"
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
                <div
                  className="flex gap-5 justify-center mt-[62px]"
                  data-aos="zoom-in"
                >
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

export default HijauSage;
