import React from "react";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";

interface ModalInterface {
  closeModal: () => void;
  showModal: boolean;
  children: React.ReactNode;
  label: string;
  onSave?: (event: any) => void;
  loadingSave?: boolean;
  deleteModal?: boolean;
}

const backdropVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.2,
    },
  },
};

const modalVariant = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
    },
  },
};

function Modal({
  closeModal,
  showModal,
  children,
  label,
  onSave,
  loadingSave,
  deleteModal,
}: ModalInterface) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-80"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative w-1/3 my-6 mx-auto max-w-3xl"
            variants={modalVariant}
          >
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-tersierdark">
              <div className="flex items-center justify-between p-5 border-b border-solid border-gray-700 rounded-t">
                <h5 className="text-xl font=semibold">{label}</h5>
                <span
                  className="cursor-pointer bg-transparent border-0 text-white float-right"
                  onClick={closeModal}
                >
                  <span className="text-white opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                    x
                  </span>
                </span>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-700 gap-2 rounded-b">
                <Button
                  title={deleteModal ? "Batalkan" : "Tutup"}
                  onClick={closeModal}
                />
                <Button
                  title={deleteModal ? "Ya" : "Simpan"}
                  formSubmit={!onSave}
                  onClick={onSave}
                  bg="blue"
                  loading={loadingSave}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
