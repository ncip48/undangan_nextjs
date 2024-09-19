import React from "react";

interface SelectProps {
  label: string;
  errors?: any[];
  items: Items[];
  name: string;
  defaultValue: string;
  info?: string;
}

interface Items {
  value: string;
  label: string;
}

function Select({
  label,
  errors = [],
  items = [],
  name,
  defaultValue,
  info,
}: SelectProps) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-textgray dark:textgray"
      >
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="p-2.5 block w-full mt-1 rounded-md shadow-sm border border-inputborder focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-primarydark dark:placeholder-textgray dark:text-white dark:focus:ring-inputfocus dark:focus:border-inputfocus"
      >
        <option value="" disabled>
          -- Pilih {label} --
        </option>
        {items?.map((item: Items, index: number) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>
      <div className="mt-1 text-xs text-red-500">
        {errors.find((error: any) => error.for === name)?.message}
      </div>
      {info && <div className="mt-1 text-xs text-green-500">{info}</div>}
    </div>
  );
}

export default Select;
