"use client";

import React, { FormEvent, useState } from "react";
import { login } from "../lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginServices } from "@/services/actions/login";
import { getProfile } from "@/services/actions/profile";

function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        username: z.string().min(1, { message: "Kolom ini diperlukan" }),
        password: z
          .string()
          .min(1, { message: "Kolom ini diperlukan" })
          .min(4, { message: "Minimal 4 karakter" }),
      });

      const response = schema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
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

      const res = await loginServices(response.data);
      if (res) {
        const profile = await getDataProfile(res);
        await login(res, profile);
        if (profile?.role == 0) {
          router.push("/scan");
        } else {
          router.push("/dashboard");
        }
      }

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataProfile = async (token: string) => {
    const res = await getProfile(token);
    return res;
  };

  return (
    <section className="bg-gray-50 dark:bg-dark-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Absensi
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark-800 dark:border-dark-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Masuk ke akun Anda
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <Input
                label="Username"
                name="username"
                errors={errors}
                placeholder="johndoe444"
              />
              <Input
                label="Password"
                name="password"
                errors={errors}
                placeholder="********"
                type="password"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <Button loading={isLoading} title="Sign In" formSubmit block />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
