"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Input from "@/components/Input";
import { presentByNISwithToken } from "@/services/actions/absent";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import {
  BellAlertIcon,
  CameraIcon,
  CodeBracketSquareIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import { Scanner } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";
import MessageAbsen from "@/components/MessageAbsen";

function Index() {
  //OLD SCAN
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [mode, setMode] = useState<number>(0);
  const [flashMessage, setFlashMessage] = useState<string>("");

  const [thisTime, setThisTime] = useState<any>("00:00:00");

  useEffectAfterMount(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      setThisTime(date.toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Loading...");

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        nis: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      const response = schema.safeParse({
        nis: formData.get("nis"),
      });

      // refine errors
      if (!response.success) {
        let errArr: any[] = [];
        const { errors: err } = response.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        setErrors(errArr);
        throw err;
      }

      formData.set("nis", "");
      const res = await presentByNISwithToken(response.data.nis);

      if (res) {
        setFlashMessage(res);
      }

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  const onScan = async (nis: string) => {
    setIsLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const res = await presentByNISwithToken(nis);

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-dark-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 gap-12">
        {/* message */}
        {flashMessage.length ? <MessageAbsen text={flashMessage} /> : null}

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-3xl xl:p-0 dark:bg-dark-800 dark:border-dark-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h1 className="w-full text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Absen Masuk
              </h1>
              <span
                onClick={() => setMode((prev: any) => (prev == 1 ? 0 : 1))}
                className="p-2 dark:bg-dark-900 rounded-full cursor-pointer"
              >
                {mode == 1 ? (
                  <CodeBracketSquareIcon className="w-5 h-5 text-inherit" />
                ) : (
                  <CameraIcon className="w-5 h-5 text-inherit" />
                )}
              </span>
            </div>
            <form
              ref={ref}
              className="space-y-4 md:space-y-6"
              onSubmit={async (e) => {
                await onSubmit(e);
                ref.current?.reset();
              }}
            >
              {mode == 0 && (
                <Input
                  label=""
                  name="nis"
                  errors={errors}
                  placeholder="123456"
                  leftIcon={<QrCodeIcon className="w-5 h-5 text-inherit" />}
                  autoFocus
                  onBlur={(e: any) => {
                    // only re-focus if the user clicked on something
                    // that was NOT an input element
                    if (e.relatedTarget === null) {
                      e.target.focus();
                    }
                  }}
                />
              )}
              {mode == 1 && (
                <Scanner
                  onScan={(result) => onScan(result[0]?.rawValue)}
                  allowMultiple
                  scanDelay={2000}
                  constraints={{
                    facingMode: "user",
                  }}
                />
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                {thisTime}
              </h1>
              {/* <Button loading={isLoading} title="Absen" formSubmit block /> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
