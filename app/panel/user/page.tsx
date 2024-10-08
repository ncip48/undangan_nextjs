"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { FormEvent, useRef, useState } from "react";
import CardMain from "@/components/CardMain";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { z } from "zod";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/services/actions/user";
import Select from "@/components/Select/input";

function Index() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const refDelete = useRef<HTMLFormElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>({
    id: null,
    nis: "",
    nisn: "",
    name: "",
    grade: "",
    sex: "",
    kelas: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getUsers();
    res?.map((item: any) => {
      item.role_str =
        item.role === 1 ? "User" : item.role === 2 ? "Marketing" : "Admin";
    });
    setDatas(res);
    setLoading(false);
  };

  useEffectAfterMount(() => {
    getData();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(event);

    try {
      const formData = new FormData(event.currentTarget);
      const password = formData.get("password");
      const schema = z.object({
        username: z.string().min(1, { message: "Kolom ini diperlukan" }),
        email: z
          .string()
          .email({ message: "Email tidak valid" })
          .min(1, { message: "Kolom ini diperlukan" }),
        password: !isEdit
          ? z.string().min(8, { message: "Minimal 8 karakter" })
          : !password && !isEdit
          ? z.string().min(8, { message: "Minimal 8 karakter" })
          : z.string(),
        role: z.string().min(1, { message: "Kolom ini harap dipilih" }),
      });

      let response: any = schema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
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

      let res;
      if (isEdit) {
        response.data.id = editData.id;
        res = await updateUser({
          ...response.data,
          role: parseInt(response.data.role),
        });
      } else {
        res = await createUser({
          ...response.data,
          role: parseInt(response.data.role),
        });
      }
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

  const onSubmitDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await deleteUser(editData?.id);
      // console.log("res del", res);

      if (res) {
        setModalDelete(false);
        clearInput();
        getData();
      }
    } catch (error: any) {
      //   console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    ref.current?.reset();
    setEditData({
      id: null,
      nis: "",
      nisn: "",
      name: "",
      grade: "",
      sex: "",
      kelas: "",
    });
    setIsEdit(false);
    setErrors([]);
  };

  return (
    <>
      <CardMain title="Daftar User" onAdd={() => setModal(true)} isAdmin>
        <Table
          items={datas}
          loading={loading}
          heads={["Username", "Email", "Role"]}
          keys={["username", "email", "role_str"]}
          onEdit={(val: any) => {
            setIsEdit(true);
            // console.log(val);
            setEditData(val);
            //set the form with current
            setModal(true);
          }}
          onDelete={(val: any) => {
            // console.log(val);
            setEditData(val);
            //set the form with current
            setModalDelete(true);
          }}
          noStatus
        />
      </CardMain>

      <form
        ref={ref}
        className="space-y-4 md:space-y-6"
        onSubmit={async (e) => {
          await onSubmit(e);
          ref.current?.reset();
        }}
      >
        <Modal
          closeModal={() => {
            setModal(false);
            clearInput();
          }}
          showModal={modal}
          label={isEdit ? "Edit User" : "Tambah User"}
          loadingSave={isLoading}
        >
          <Input
            label="Username"
            name="username"
            placeholder="siapaya"
            errors={errors}
            defaultValue={editData?.username}
          />
          <Input
            label="Email"
            name="email"
            placeholder="kyud@mail.example"
            errors={errors}
            defaultValue={editData?.email}
          />
          <Input
            label="Password"
            name="password"
            placeholder="********"
            errors={errors}
            type="password"
            info={
              !isEdit ? "" : "Kosongkan jika tidak ingin mengganti password"
            }
          />
          <Select
            name="role"
            defaultValue={editData?.role}
            label="Hak Akses"
            items={[
              {
                value: "0",
                label: "Admin",
              },
              {
                value: "1",
                label: "User",
              },
              {
                value: "2",
                label: "Marketing",
              },
            ]}
          />
        </Modal>
      </form>

      <form
        ref={refDelete}
        className="space-y-4 md:space-y-6"
        onSubmit={async (e) => {
          await onSubmitDelete(e);
        }}
      >
        <Modal
          closeModal={() => {
            setModalDelete(false);
            clearInput();
          }}
          showModal={modalDelete}
          label={"Hapus User"}
          loadingSave={isLoading}
          deleteModal
        >
          Apakah yakin untuk menghapus data?
        </Modal>
      </form>
    </>
  );
}

export default Index;
