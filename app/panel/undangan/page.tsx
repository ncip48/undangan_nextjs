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
  createWedding,
  deleteWedding,
  getWeddings,
  updateWedding,
} from "@/services/actions/undangan";
import Select from "@/components/Select/input";
import { getTemplates } from "@/services/actions/template";

function Index() {
  const [datas, setDatas] = useState([]);
  const [trxs, setDataTrxs] = useState([]);
  const [templates, setTemplates] = useState([]);
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
    purchaseId: "",
    templateId: "",
    username: "",
  });

  const getData = async () => {
    setLoading(true);
    let res = await getWeddings();
    res?.map((item: any) => {
      item.createdAt_s = new Date(item.createdAt).toLocaleDateString("id-ID");
      item.expiredDate = new Date(
        new Date(item.createdAt).setMonth(
          new Date(item.createdAt).getMonth() + 1
        )
      ).toLocaleDateString("id-ID");
      item.isExpired_s = item.isExpired ? "Expired" : "Aktif";
    });
    setDatas(res);
    setLoading(false);
  };

  const getDataTrx = async () => {
    const res = await getTransactions();
    const newRes: any = [];
    res.map((item: any) => {
      newRes.push({
        label: item.name,
        value: item.id,
      });
    });
    setDataTrxs(newRes);
  };

  const getDataTemplate = async () => {
    const res = await getTemplates();
    const newRes: any = [];
    res.map((item: any) => {
      newRes.push({
        label: item.name,
        value: item.id,
      });
    });
    setTemplates(newRes);
  };

  useEffectAfterMount(() => {
    getData();
    getDataTrx();
    getDataTemplate();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(event);

    try {
      const formData = new FormData(event.currentTarget);
      const schema = z.object({
        username: z.string().min(1, { message: "Kolom ini diperlukan" }),
        purchaseId: z.string().min(1, { message: "Kolom ini diperlukan" }),
        templateId: z.string().min(1, { message: "Kolom ini diperlukan" }),
      });

      let response: any = schema.safeParse({
        username: formData.get("username"),
        purchaseId: formData.get("purchaseId"),
        templateId: formData.get("templateId"),
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
        res = await updateWedding({
          ...response.data,
        });
      } else {
        res = await createWedding({
          ...response.data,
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
      const res = await deleteWedding(editData?.id);
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
      purchaseId: "",
      templateId: "",
      username: "",
    });
    setIsEdit(false);
    setErrors([]);
  };

  return (
    <>
      <CardMain title="Daftar Undangan" onAdd={() => setModal(true)} isAdmin>
        <Table
          items={datas}
          loading={loading}
          heads={["Username", "Status", "Tanggal Dibuat", "Tanggal Expired"]}
          keys={["username", "isExpired_s", "createdAt_s", "expiredDate"]}
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
          noEdit
        />
      </CardMain>

      <form
        ref={ref}
        className="space-y-4 md:space-y-6"
        onSubmit={async (e) => {
          await onSubmit(e);
        }}
      >
        <Modal
          closeModal={() => {
            setModal(false);
            clearInput();
          }}
          showModal={modal}
          label={isEdit ? "Edit Undangan" : "Tambah Undangan"}
          loadingSave={isLoading}
        >
          <Select
            label="Transaksi"
            name="purchaseId"
            items={trxs}
            defaultValue={editData?.purchaseId}
          />
          <Select
            label="Template"
            name="templateId"
            items={templates}
            defaultValue={editData?.templateId}
          />
          <Input
            label="Username"
            name="username"
            placeholder="dwidanherly"
            errors={errors}
            defaultValue={editData?.username}
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
          label={"Hapus Undangan"}
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
