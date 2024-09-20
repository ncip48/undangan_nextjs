import React from "react";

interface FileInputProps {
  label: string;
  errors: { for: string; message: string }[];
  name: string;
  info?: string;
}

function FileInput({ label, errors = [], name, info }: FileInputProps) {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-sm font-medium text-textgray dark:text-textgray">
        {label}
      </label>
      <input
        className="p-2.5 block w-full text-sm text-textgray border border-inputborder rounded-lg cursor-pointer bg-primarydark dark:text-textgray focus:outline-none dark:bg-primarydark dark:border-inputborder dark:placeholder-textgray"
        id={name}
        type="file"
        name={name}
      />
      <div className="mt-1 text-xs text-red-500">
        {errors.find((error: any) => error.for === name)?.message}
      </div>
      {info && <div className="mt-1 text-xs text-green-500">{info}</div>}
    </div>
  );
}

export default FileInput;
