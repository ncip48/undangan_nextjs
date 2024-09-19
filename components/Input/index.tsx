import React from "react";

interface InputProps {
  label: string;
  errors: { for: string; message: string }[];
  name: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  leftIcon?: React.ReactNode;
  defaultValue?: any;
  info?: string;
  autoFocus?: any;
  onBlur?: any;
}

function Input({
  label,
  errors = [],
  name,
  type = "text",
  placeholder,
  readonly,
  leftIcon,
  defaultValue,
  info,
  autoFocus,
  onBlur,
  ...otherProps
}: InputProps) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-textgray dark:text-textgray"
      >
        {label}
      </label>
      <div className="flex items-center focus-visible:ring-0 bg-primarydark border border-inputborder rounded-lg focus:ring-inputborder focus:border-inputborder block w-full dark:bg-primarydark dark:border-inputborder dark:placeholder-textgray dark:text-white dark:focus:ring-inputfocus dark:focus:border-inputfocus">
        {leftIcon && <div className="mr-2.5 ml-2.5">{leftIcon}</div>}
        <input
          {...otherProps}
          readOnly={readonly}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete="off"
          className={`rounded-lg focus-visible:ring-inputfocus bg-gray-50 text-gray-900 block w-full ${
            leftIcon ? "pl-0" : ""
          } ${
            readonly ? "cursor-not-allowed" : ""
          } p-2.5 dark:bg-primarydark dark:placeholder-textgray dark:text-white dark:focus:ring-inputborder dark:focus:border-inputfocus dark:focus:ring-0`}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onBlur={onBlur}
        />
      </div>
      <div className="mt-1 text-xs text-red-500">
        {errors.find((error: any) => error.for === name)?.message}
      </div>
      {info && <div className="mt-1 text-xs text-green-500">{info}</div>}
    </div>
  );
}

export default Input;
