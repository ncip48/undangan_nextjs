"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { FormEvent, useRef, useState } from "react";
import CardMain from "@/components/CardMain";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { z } from "zod";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/services/actions/transaksi";
import { formatRupiah } from "@/lib/currency";
import {
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate,
} from "@/services/actions/template";
import FileInput from "@/components/FileInput";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
    name: "",
    path: "",
    image: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getTemplates();
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
      // console.log(formData.get("image"));
      const schema = z.object({
        name: z.string().min(1, { message: "Kolom ini diperlukan" }),
        path: z.string().min(1, { message: "Kolom ini diperlukan" }),
        image: z.instanceof(File),
      });

      let response: any = schema.safeParse({
        name: formData.get("name"),
        path: formData.get("path"),
        image: formData.get("image"),
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
        const frmImg = formData.get("image") as File;
        const image: string = frmImg.name;
        if (image == "") {
          delete response.data.image;
        }
        res = await updateTemplate({ ...response.data });
      } else {
        res = await createTemplate({ ...response.data });
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
      const res = await deleteTemplate(editData?.id);
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
      name: "",
      path: "",
      image: "",
    });
    setIsEdit(false);
    setErrors([]);
  };

  return (
    <>
      <CardMain title="Daftar Template" onAdd={() => setModal(true)} isAdmin>
        <Table
          items={datas}
          loading={loading}
          heads={["Nama", "Pathname", "Preview"]}
          keys={["name", "path"]}
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
          addRows={(item: any) => (
            <img
              className="rounded h-auto max-w-[80px]"
              src={`/assets/${item.image}`}
            />
          )}
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
          label={isEdit ? "Edit Template" : "Tambah Template"}
          loadingSave={isLoading}
        >
          <Input
            label="Nama Template"
            name="name"
            placeholder="kyowo"
            errors={errors}
            defaultValue={editData?.name}
          />
          <Input
            label="Path"
            name="path"
            placeholder="template2"
            errors={errors}
            defaultValue={editData?.path}
          />
          <FileInput
            label="Gambar/Preview"
            name="image"
            errors={errors}
            info={isEdit ? "Abaikan jika tidak ingin mengganti gambar" : ""}
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
          label={"Hapus Transaksi"}
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
