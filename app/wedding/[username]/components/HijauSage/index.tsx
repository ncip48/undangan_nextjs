import {
  CalendarDaysIcon,
  GiftIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  UsersIcon,
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
import { Gift, WeddingInterface } from "@/interfaces/wedding";
import { useAudio } from "@/utils/useAudio";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

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
        {type == 0 ? "Putri" : "Putra"} {ke} dari {nama_ortu}
      </p>
    </div>
  );
};

const MenuButton = ({
  name,
  icon,
  onClick,
  className,
}: {
  name: string;
  icon: any;
  onClick: any;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      {icon}
      <p className={`${className} text-[7px]`}>{name}</p>
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

const GiftCard = ({
  type,
  name,
  an,
}: {
  type: string;
  name: string;
  an?: string;
}) => {
  const imageUri = `/assets/bank/${type}.png`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Berhasil copy to clipboard");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <div
      className="border border-[#996A32] p-4 rounded-2xl bg-white"
      data-aos="zoom-in"
    >
      <Image
        className="mx-auto mb-2"
        src={imageUri}
        alt="img"
        width={type === "address" ? 48 : 103}
        height={type === "address" ? 48 : 55}
      />
      <p className="text-black text-center">{an}</p>
      <p className="text-black text-center font-semibold">{name}</p>
      <button
        className="bg-[#336546] px-[12px] py-[9px] rounded-full flex flex-row gap-1 items-center mx-auto mt-2 text-[12px] text-white"
        onClick={() => copyToClipboard(name)}
      >
        Salin
        <DocumentDuplicateIcon className="h-5 text-white" />
      </button>
    </div>
  );
};

function HijauSage({
  receiver,
  data,
}: {
  receiver: { at?: string; to?: string };
  data: WeddingInterface;
}) {
  const [playing, toggle] = useAudio("/assets/mp3/diary.mp3");
  const refMempelai: any = useRef(null);
  const refAcara: any = useRef(null);
  const refGift: any = useRef(null);

  const [activeSection, setActiveSection] = useState(0);

  const scrollToMempelai = () => refMempelai.current.scrollIntoView();
  const scrollToAcara = () => refAcara.current.scrollIntoView();
  const scrollToGift = () => refGift.current.scrollIntoView();

  useEffect(() => {
    const handleScroll = () => {
      if (!refMempelai.current || !refAcara.current || !refGift.current) return; // Check if refs are not null

      const mempelaiPosition = refMempelai.current.getBoundingClientRect();
      const acaraPosition = refAcara.current.getBoundingClientRect();
      const giftPosition = refGift.current.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      if (mempelaiPosition.top >= 0 && mempelaiPosition.top < windowHeight) {
        setActiveSection(0);
      } else if (acaraPosition.top >= 0 && acaraPosition.top < windowHeight) {
        setActiveSection(1);
      } else if (giftPosition.top >= 0 && giftPosition.top < windowHeight) {
        setActiveSection(2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [counter, setCounter] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 100,
    });

    //count down with timer data.tanggal_akad then setCounter
    const countDownDate = new Date(
      `${data.tanggal_akad.split("T")[0]}T${data.jam_akad.split(" -")[0]}`
    ).getTime();
    const x = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setCounter({
        hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
        jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((distance % (1000 * 60)) / 1000),
      });
      if (distance < 0) {
        clearInterval(x);
        setCounter({
          hari: 0,
          jam: 0,
          menit: 0,
          detik: 0,
        });
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className="bg-green-50 overflow-hidden">
        <div className="max-w-screen-md ml-auto mr-auto">
          {!open ? (
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
                  className="mt-10 h-96 w-96"
                  // data-aos="zoom-in"
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
                    onClick={() => {
                      setOpen(true);
                      toggle();
                    }}
                    className="animate-bounce bg-[#336546] text-white rounded-full px-3 py-2 text-xs mt-10"
                  >
                    Buka Undangan
                  </button>
                </div>
              </div>
              {/* end undangan cover */}
            </>
          ) : (
            <>
              {/* undangan isi */}
              <audio loop hidden autoPlay={playing}></audio>
              <div className="relative bg-white">
                <div ref={refMempelai} className="pt-[111px]">
                  <>
                    <Image
                      src="/assets/templates/t1/isiatas.png"
                      alt="isiatas"
                      height={104}
                      width={390}
                      className="w-full absolute z-[99] top-0"
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
                      className="absolute z-[99] left-0 mt-[43rem]"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi4.png"
                      alt="daunisi4"
                      height={187}
                      width={130}
                      className="absolute z-[99] right-0 mt-[43rem]"
                      data-aos="zoom-in-left"
                    />
                  </>
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
                <div ref={refAcara} className="bg-white relative">
                  <>
                    <Image
                      src="/assets/templates/t1/daunisi5.png"
                      alt="daunisi5"
                      height={141}
                      width={70}
                      className="absolute z-[99] right-0 mt-[10rem]"
                      data-aos="zoom-in-left"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi6.png"
                      alt="daunisi6"
                      height={192}
                      width={74}
                      className="absolute z-[99] left-0 mt-[20rem]"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daunisi7.png"
                      alt="daunisi7"
                      height={306}
                      width={196}
                      className="absolute z-[99] right-0 mt-[41rem]"
                      data-aos="zoom-in-left"
                    />
                    <Image
                      src="/assets/templates/t1/bgisi1.png"
                      alt="bgisi1"
                      height={200}
                      width={200}
                      className="absolute z-[99] left-14 mt-[3rem]"
                      data-aos="zoom-in"
                    />
                    <Image
                      src="/assets/templates/t1/bgisi2.png"
                      alt="bgisi2"
                      height={200}
                      width={200}
                      className="absolute z-[99] right-0 mt-[20rem]"
                      data-aos="zoom-in"
                    />
                    <Image
                      src="/assets/templates/t1/bgisi3.png"
                      alt="bgisi3"
                      height={200}
                      width={200}
                      className="absolute z-[99] left-0 mt-[40rem]"
                      //   data-aos="zoom-in"
                    />
                  </>
                  <div className="h-screen flex flex-col justify-center">
                    <AcaraSection
                      type={0}
                      tanggal={data?.tanggal_akad}
                      jam={data?.jam_akad}
                      alamat={data?.alamat}
                    />
                    <div className="mt-14" />
                    <AcaraSection
                      type={1}
                      tanggal={data?.tanggal_resepsi}
                      jam={data?.jam_resepsi}
                      alamat={data?.alamat}
                    />
                    <div
                      className="flex gap-5 justify-center mt-[62px]"
                      data-aos="zoom-in"
                    >
                      <Countdown number={counter.hari} label="Hari" />
                      <Countdown number={counter.jam} label="Jam" />
                      <Countdown number={counter.menit} label="Menit" />
                      <Countdown number={counter.detik} label="Detik" />
                    </div>
                  </div>
                </div>
                <div ref={refGift} className="bg-white relative">
                  <>
                    <Image
                      src="/assets/templates/t1/daungift1.png"
                      alt="daungift1"
                      height={186}
                      width={136}
                      className="absolute z-[99] left-0 mt-0"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daungift2.png"
                      alt="daungift2"
                      height={156}
                      width={144}
                      className="absolute z-[99] right-0 mt-[19rem]"
                      data-aos="zoom-in-left"
                    />
                    <Image
                      src="/assets/templates/t1/daungift3.png"
                      alt="daungift3"
                      height={178}
                      width={165}
                      className="absolute z-[99] left-0 mt-[31rem]"
                      data-aos="zoom-in-right"
                    />
                    <Image
                      src="/assets/templates/t1/daungiftbawah.png"
                      alt="daungiftbawah"
                      height={96}
                      width={180}
                      className="absolute z-[99] bottom-0 left-0 right-0 ml-auto mr-auto"
                      //   data-aos="zoom-in-up"
                    />
                  </>
                  <div className="h-screen flex flex-col justify-center rounded-full bg-[#d5c3ac] px-[45px]">
                    <h1
                      className={`${lobster.className} text-[48px] text-[#336546] text-center`}
                      data-aos="zoom-in"
                    >
                      Gift
                    </h1>
                    <p
                      className={`${poppins.className} text-[12px] text-black text-center py-6`}
                      data-aos="zoom-in"
                    >
                      Bagi yang berkeinginan memberikan tanda kasih, kami
                      menyediakan wedding gift dibawah ini:
                    </p>
                    <div className="flex flex-col gap-8 px-[15px]">
                      {data.gift.map((item: Gift, index: number) => {
                        return (
                          <GiftCard
                            name={item.name}
                            an={item.an}
                            key={index}
                            type={item.type}
                          />
                        );
                      })}
                    </div>
                    <p
                      className={`${poppins.className} text-[12px] text-black text-center mb-2 mt-4`}
                      data-aos="zoom-in"
                    >
                      Terima Kasih <br /> Atas kehadiran dan Doa restunya
                    </p>
                    <p
                      className={`${poppins.className} text-[12px] text-black text-center mb-3`}
                      data-aos="zoom-in"
                    >
                      Kami yang Berbahagia, Keluarga Besar Kedua Mempelai
                    </p>
                    <p
                      className={`${licorice.className} text-center text-[36px] text-[#336546]`}
                      data-aos="zoom-in"
                    >
                      {data?.singkatan_wanita} & {data?.singkatan_pria}
                    </p>
                  </div>
                </div>
                {/* fab */}
                {open && (
                  <div className="flex flex-col items-center z-[99] bg-transparent fixed bottom-0 top-0 mt-auto mb-auto h-fit right-0 m-4 gap-2">
                    <div
                      className={`flex flex-col bg-[#be9f7c] rounded-full px-2 py-2 gap-8`}
                    >
                      <MenuButton
                        name="Mempelai"
                        onClick={scrollToMempelai}
                        icon={
                          <UsersIcon
                            className={`h-6 ${
                              activeSection === 0
                                ? "text-[#336546]"
                                : "text-white"
                            }`}
                          />
                        }
                        className={`${
                          activeSection === 0 ? "text-[#336546]" : "text-white"
                        }`}
                      />
                      <MenuButton
                        name="Acara"
                        onClick={scrollToAcara}
                        icon={
                          <CalendarDaysIcon
                            className={`h-6 ${
                              activeSection === 1
                                ? "text-[#336546]"
                                : "text-white"
                            }`}
                          />
                        }
                        className={`${
                          activeSection === 1 ? "text-[#336546]" : "text-white"
                        }`}
                      />
                      <MenuButton
                        name="Gift"
                        onClick={scrollToGift}
                        icon={
                          <GiftIcon
                            className={`h-6 ${
                              activeSection === 2
                                ? "text-[#336546]"
                                : "text-white"
                            }`}
                          />
                        }
                        className={`${
                          activeSection === 2 ? "text-[#336546]" : "text-white"
                        }`}
                      />
                    </div>
                    <button onClick={toggle}>
                      {playing ? (
                        <PauseCircleIcon className="text-[#be9f7c] h-5" />
                      ) : (
                        <PlayCircleIcon className="text-[#be9f7c] h-5" />
                      )}
                    </button>
                  </div>
                )}
                {/* end fab */}
              </div>
              {/*end undangan isi */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HijauSage;
