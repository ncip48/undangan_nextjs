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
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/services/actions/transaksi";
import { formatRupiah } from "@/lib/currency";

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
    total: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getTransactions();
    res?.map((item: any) => {
      item.createdAt_s = new Date(item.createdAt).toLocaleDateString("id-ID");
      item.total_s = formatRupiah(item.total);
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
      const schema = z.object({
        name: z.string().min(1, { message: "Kolom ini diperlukan" }),
        total: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      let response: any = schema.safeParse({
        name: formData.get("name"),
        total: formData.get("total"),
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
        res = await updateTransaction({
          ...response.data,
          total: parseInt(response.data.total),
        });
      } else {
        res = await createTransaction({
          ...response.data,
          total: parseInt(response.data.total),
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
      const res = await deleteTransaction(editData?.id);
      // console.log("res del", res);

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
    setEditData({
      id: null,
      name: "",
      total: "",
    });
    setIsEdit(false);
    setErrors([]);
  };

  return (
    <>
      <CardMain title="Daftar Transaksi" onAdd={() => setModal(true)} isAdmin>
        <Table
          items={datas}
          loading={loading}
          heads={["Nama", "Total", "Tanggal"]}
          keys={["name", "total_s", "createdAt_s"]}
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
          label={isEdit ? "Edit Siswa" : "Tambah Siswa"}
          loadingSave={isLoading}
        >
          <Input
            label="Nama"
            name="name"
            placeholder="Didik"
            errors={errors}
            defaultValue={editData?.name}
          />
          <Input
            label="Total"
            name="total"
            placeholder="250000"
            errors={errors}
            defaultValue={editData?.total}
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
