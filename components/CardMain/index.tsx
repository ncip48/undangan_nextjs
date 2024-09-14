import React from "react";
import Button from "../Button";

function CardMain({
  title,
  children,
  onAdd,
  onImport,
  isAdmin,
}: {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
  onImport?: () => void;
  isAdmin?: boolean;
}) {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 mr-4">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-dark-800 dark:text-white">
        {/* <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6"> */}
        <div className="p-5 flex justify-between items-center">
          <h6 className="block antialiased tracking-normal font-sans text-base font-bold leading-relaxed text-white">
            {title}
          </h6>
          <div className="flex gap-2">
            {onAdd && isAdmin && (
              <Button onClick={onAdd} title="Tambah" loading={false} />
            )}
            {onImport && isAdmin && (
              <Button onClick={onImport} title="Import" loading={false} />
            )}
          </div>
        </div>
        {/* </div> */}
        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">{children}</div>
      </div>
    </div>
  );
}

export default CardMain;
