"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { FormEvent, useRef, useState } from "react";
import CardMain from "@/components/CardMain";
import Input from "@/components/Input";
import { z } from "zod";
import Button from "@/components/Button";
import { getProfileNoToken, updateProfile } from "@/services/actions/profile";

function Index() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setprofileData] = useState<any>({
    username: "",
    email: "",
    name: "",
    phoneNumber: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getProfileNoToken();
    setprofileData(res);
    // console.table(res);
    setLoading(false);
  };

  useEffectAfterMount(() => {
    getData();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(event);

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        name: z.string().min(1, { message: "Kolom ini diperlukan" }),
        username: z.string().min(1, { message: "Kolom ini diperlukan" }),
        phoneNumber: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      let response: any = schema.safeParse({
        name: formData.get("name"),
        username: formData.get("username"),
        phoneNumber: formData.get("phoneNumber"),
      });

      const password = formData.get("password");
      if (password) {
        response.data.password = formData.get("password");
      }

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

      const res = await updateProfile(response.data);

      if (res) {
        setModal(false);
        getData();
        clearInput();
      }
      setErrors([]);
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setprofileData({
      username: "",
      email: "",
      name: "",
      phoneNumber: "",
    });
    setErrors([]);
  };

  return (
    <>
      {/* <DashboardNavbar active="Siswa" /> */}
      <CardMain title="Pengaturan Akun">
        {loading ? (
          <div role="status" className="text-center p-6">
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-white-200 animate-spin dark:text-white-600 fill-dark-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <form
            className="space-y-4 p-5"
            onSubmit={async (e) => {
              await onSubmit(e);
            }}
          >
            <Input
              label="Username"
              name="username"
              placeholder="abdul"
              errors={errors}
              defaultValue={profileData?.username}
            />
            <Input
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              errors={errors}
              defaultValue={profileData?.email}
              readonly
            />
            <Input
              label="Nama"
              name="name"
              placeholder="Budianto"
              errors={errors}
              defaultValue={profileData?.name}
            />
            <Input
              label="No HP"
              name="phoneNumber"
              placeholder="081111111111"
              errors={errors}
              defaultValue={profileData?.phoneNumber}
            />
            <Input
              label="Password"
              name="password"
              placeholder="********"
              errors={errors}
              type="password"
              info="Kosongkan jika tidak ingin mengganti password"
            />
            <Button title="Simpan" formSubmit loading={isLoading} />
          </form>
        )}
      </CardMain>
    </>
  );
}

export default Index;
