import React from "react";
import Button from "../Button";

interface ModalInterface {
  closeModal: () => void;
  showModal: boolean;
  children: React.ReactNode;
  label: string;
  onSave?: (event: any) => void;
  loadingSave?: boolean;
  deleteModal?: boolean;
}

function Modal({
  closeModal,
  showModal,
  children,
  label,
  onSave,
  loadingSave,
  deleteModal,
}: ModalInterface) {
  return showModal ? (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-80">
        <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-dark-900">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h5 className="text-xl font=semibold">{label}</h5>
              <button
                className="bg-transparent border-0 text-white float-right"
                onClick={() => closeModal()}
              >
                <span className="text-white opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
        </div>
      </div>
    </>
  ) : null;
}

export default Modal;
