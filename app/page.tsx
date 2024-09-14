"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginServices } from "@/services/actions/login";
import { presentByNIS } from "@/services/actions/absent";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import { getSession } from "./lib";

function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>([]);

  const [thisTime, setThisTime] = useState<any>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

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

      const res = await presentByNIS(response.data.nis);

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-dark-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark-800 dark:border-dark-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Nama Siswa
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <Input
                label=""
                name="nis"
                errors={errors}
                placeholder="123456"
                leftIcon={<QrCodeIcon className="w-5 h-5 text-inherit" />}
              />
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
