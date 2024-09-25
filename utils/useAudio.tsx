import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAuido]: any = useState();
  const [playing, setPlaying] = useState(false);

  const toggle: any = () => setPlaying(!playing);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuido(new Audio(url));
    }
  }, []);

  useEffect(() => {
    if (audio !== undefined) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio === undefined) {
      return;
    }
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};
