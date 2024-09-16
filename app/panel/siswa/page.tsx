"use client";

import Table from "@/components/Table";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/services/actions/student";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { FormEvent, useRef, useState } from "react";
import CardMain from "@/components/CardMain";
import { getSession } from "@/app/lib";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { z } from "zod";
import { importStudent } from "@/services/actions/student";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalImport, setModalImport] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const refDelete = useRef<HTMLFormElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>({
    id: null,
    nis: "",
    nisn: "",
    name: "",
    grade: "",
    sex: "",
    kelas: "",
  });

  const [formImport, setFormImport] = useState<any>({
    kelas: "",
    file: null,
  });

  const getData = async () => {
    setLoading(true);
    let res = await getStudents();
    res?.map((item: any) => {
      item.sex_str = item.sex === 1 ? "Laki-Laki" : "Perempuan";
    });
    // console.table(res);
    setStudents(res);
    setLoading(false);
  };

  const checkAdmin = async () => {
    const storage = await getSession();
    const role = storage?.user?.profile?.role;
    if (role != 2) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  useEffectAfterMount(() => {
    getData();
    checkAdmin();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(event);

    try {
      const formData = new FormData(event.currentTarget);

      const schema = z.object({
        nis: z.string().min(1, { message: "Kolom ini diperlukan" }),
        nisn: z.string().min(1, { message: "Kolom ini diperlukan" }),
        name: z.string().min(1, { message: "Kolom ini diperlukan" }),
        // grade: z.string().min(1, { message: "Kolom ini diperlukan" }),
        sex: z.string().min(1, { message: "Kolom ini diperlukan" }),
        kelas: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      let response: any = schema.safeParse({
        nis: formData.get("nis"),
        nisn: formData.get("nisn"),
        name: formData.get("name"),
        // grade: formData.get("grade"),
        sex: formData.get("sex"),
        kelas: formData.get("kelas"),
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

      response.data.grade = formData.get("grade");

      let res;
      if (isEdit) {
        res = await updateStudent(studentData?.id, response.data);
      } else {
        res = await createStudent(response.data);
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

  const onSubmitImport = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(event.currentTarget);

    try {
      const formData = new FormData(event.currentTarget);

      // console.log(formData);

      // const schema = z.object({
      //   file: z
      //     .any()
      //     .refine((files) => files?.length == 1, "Kolom ini diperlukan."),
      // });

      // let response: any = schema.safeParse({
      //   file: formData.get("file"),
      // });

      // console.log(response);

      // // refine errors
      // if (!response.success) {
      //   let errArr: any[] = [];
      //   const { errors: err } = response.error;
      //   for (var i = 0; i < err.length; i++) {
      //     errArr.push({ for: err[i].path[0], message: err[i].message });
      //   }
      //   setErrors(errArr);
      //   throw err;
      // }

      let res = await importStudent(formData);

      console.log(res);

      if (res) {
        setModalImport(false);
        getData();
        clearInputImport();
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
      const res = await deleteStudent(studentData?.nis);

      if (res) {
        setModalDelete(false);
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
    setStudentData({
      id: null,
      nis: "",
      nisn: "",
      name: "",
      grade: "",
      sex: "",
      kelas: "",
    });
    setErrors([]);
  };

  const clearInputImport = () => {
    ref.current?.reset();
    setFormImport({
      kelas: "",
      file: null,
    });
    setErrors([]);
  };

  return (
    <>
      {/* <DashboardNavbar active="Siswa" /> */}
      <CardMain
        title="Daftar Siswa"
        onAdd={() => setModal(true)}
        onImport={() => setModalImport(true)}
        isAdmin={isAdmin}
      >
        <Table
          items={students}
          loading={loading}
          heads={["NIS", "NISN", "Nama", "Jenis Kelamin", "Kelas", "Status"]}
          keys={["nis", "nisn", "name", "sex_str", "kelas"]}
          noAction={!isAdmin}
          onEdit={(val: any) => {
            setIsEdit(true);
            console.log(val);
            setStudentData(val);
            //set the form with current
            setModal(true);
          }}
          onDelete={(val: any) => {
            console.log(val);
            setStudentData(val);
            //set the form with current
            setModalDelete(true);
          }}
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
          label={isEdit ? "Edit Siswa" : "Tambah Siswa"}
          loadingSave={isLoading}
        >
          <Input
            label="NIS"
            name="nis"
            placeholder="123456"
            errors={errors}
            defaultValue={studentData?.nis}
          />
          <Input
            label="NISN"
            name="nisn"
            placeholder="123456"
            errors={errors}
            defaultValue={studentData?.nisn}
          />
          <Input
            label="Nama"
            name="name"
            placeholder="Budianto"
            errors={errors}
            defaultValue={studentData?.name}
          />
          <Input
            label="Grade"
            name="grade"
            placeholder="2024/2025"
            errors={errors}
            defaultValue={studentData?.grade}
          />
          <Input
            label="Kelas"
            name="kelas"
            placeholder="X MIPA"
            errors={errors}
            defaultValue={studentData?.kelas}
          />
          <div>
            <label
              htmlFor="sex"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jenis Kelamin
            </label>
            <select
              name="sex"
              defaultValue={studentData?.sex}
              className="p-2.5 block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-dark-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
            >
              <option value="" disabled>
                -- Pilih Kelamin --
              </option>
              <option value="1">Laki-laki</option>
              <option value="0">Perempuan</option>
            </select>
            <div className="mt-1 text-xs text-red-500">
              {errors.find((error: any) => error.for === "sex")?.message}
            </div>
          </div>
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
          label={"Hapus Siswa"}
          loadingSave={isLoading}
          deleteModal
        >
          Apakah yakin untuk menghapus data?
        </Modal>
      </form>

      <form className="space-y-4 md:space-y-6" onSubmit={onSubmitImport}>
        <Modal
          closeModal={() => {
            setModalImport(false);
            clearInput();
          }}
          // onSave={onSubmitImport}
          showModal={modalImport}
          label="Import Siswa"
          loadingSave={isLoading}
        >
          <Input
            label="Kelas"
            name="kelas"
            placeholder="X MIPA"
            errors={errors}
            defaultValue={formImport?.kelas}
          />
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload file
            </label>
            <input
              className="p-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-dark-700 dark:border-dark-600 dark:placeholder-dark-400"
              id="file"
              type="file"
              name="file"
            />
            <div className="mt-1 text-xs text-red-500">
              {errors.find((error: any) => error.for === "file")?.message}
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
}

export default Index;
