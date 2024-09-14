import React, { useState } from "react";

interface TableProps {
  items: any[];
  loading: boolean;
  heads: string[];
  keys: string[];
  noAction?: boolean;
  noStatus?: boolean;
  onEdit?: any;
  onDelete?: any;
}

function Table({
  items = [],
  loading,
  heads = [],
  keys = [],
  noAction = false,
  noStatus = false,
  onEdit,
  onDelete,
}: TableProps) {
  const edit = (item: any) => {
    onEdit(item);
  };

  const del = (item: any) => {
    onDelete(item);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const nbPerPage = 10;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(items.length / nbPerPage);
  const records = items.slice(startIndex, lastIndex);

  function nextPage() {
    if (currentPage != numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <>
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            <th className="border-b border-bluegray-50 py-3 px-5 text-left">
              <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                No
              </p>
            </th>
            {heads?.map((item: any, index: number) => {
              return (
                <th
                  className="border-b border-bluegray-50 py-3 px-5 text-left"
                  key={index}
                >
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    {item}
                  </p>
                </th>
              );
            })}
            {!noAction && (
              <th className="border-b border-bluegray-50 py-3 px-5 text-left">
                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                  Aksi
                </p>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={heads?.length + 2} className="text-center">
                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600 p-5">
                  Loading...
                </p>
              </td>
            </tr>
          ) : records?.length === 0 ? (
            <tr>
              <td colSpan={heads?.length + 2} className="text-center">
                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600 p-5">
                  Data kosong
                </p>
              </td>
            </tr>
          ) : (
            records?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td
                    className={`py-3 px-5 ${
                      index === items.length - 1
                        ? ""
                        : "border-b border-bluegray-50"
                    }`}
                  >
                    <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
                      {index + 1}
                    </p>
                  </td>
                  {keys.map((it: any, i: number) => {
                    return (
                      <td
                        className={`py-3 px-5 ${
                          index === items.length - 1
                            ? ""
                            : "border-b border-bluegray-50"
                        }`}
                        key={i}
                      >
                        <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
                          {it
                            .split(".")
                            .reduce(
                              (acc: any, curr: string) => acc[curr],
                              item
                            )}
                        </p>
                      </td>
                    );
                  })}
                  {!noStatus && (
                    <td
                      className={`py-3 px-5 ${
                        index === items.length - 1
                          ? ""
                          : "border-b border-bluegray-50"
                      }`}
                    >
                      <div
                        className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
                        data-projection-id="45"
                        style={{ opacity: 1 }}
                      >
                        <span className="">Aktif</span>
                      </div>
                    </td>
                  )}
                  {!noAction && (
                    <td
                      className={`py-3 px-5 ${
                        index === items.length - 1
                          ? ""
                          : "border-b border-bluegray-50"
                      }`}
                    >
                      <a
                        onClick={() => edit(item)}
                        className="block antialiased font-sans text-xs font-semibold text-blue-gray-600 cursor-pointer"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => del(item)}
                        className="block antialiased font-sans text-xs font-semibold text-blue-gray-600 cursor-pointer"
                      >
                        Hapus
                      </a>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="w-full flex flex-row items-center p-5">
        <div className="flex flex-row items-center gap-4">
          <span
            className="cursor-pointer font-semibold"
            onClick={() => prevPage()}
          >
            prev
          </span>
          <div className="flex flex-row items-center">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span
            className="cursor-pointer font-semibold"
            onClick={() => nextPage()}
          >
            next
          </span>
        </div>
      </div>
    </>
  );
}

export default Table;
