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
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-dark-700 dark:border-dark-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {leftIcon && <div className="mr-2.5 ml-2.5">{leftIcon}</div>}
        <input
          {...otherProps}
          readOnly={readonly}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete="off"
          className={`focus:outline-none bg-gray-50 text-gray-900 block w-full ${
            leftIcon ? "pl-0" : ""
          } ${
            readonly ? "cursor-not-allowed" : ""
          } p-2.5 dark:bg-dark-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700`}
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
