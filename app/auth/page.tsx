"use client";

import React, { FormEvent, useState } from "react";
import { login } from "../lib";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginServices } from "@/services/actions/login";

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
        email: z.string().email().min(1, { message: "Kolom ini diperlukan" }),
        password: z
          .string()
          .min(1, { message: "Kolom ini diperlukan" })
          .min(4, { message: "Minimal 4 karakter" }),
      });

      const response = schema.safeParse({
        email: formData.get("email"),
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
        const profile = {
          role: res.role,
          username: res.username,
          email: res.email,
        };
        await login(res.token, profile);
        router.push("/panel/dashboard");
      }

      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="dark bg-primarydark dark:bg-primarydark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Undangan
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondarydark dark:border-secondarydark">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Masuk ke akun Anda
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <Input
                label="Email"
                name="email"
                errors={errors}
                placeholder="johndoe@mail.com"
              />
              <Input
                label="Password"
                name="password"
                errors={errors}
                placeholder="********"
                type="password"
              />
              <Button
                loading={isLoading}
                title="Sign In"
                formSubmit
                block
                // bg="bluedark"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
