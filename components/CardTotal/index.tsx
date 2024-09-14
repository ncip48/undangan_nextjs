import React from "react";

interface CardTotalInterface {
  value: number | string;
  icon?: any;
  label: string;
  subtitle: string;
}

function CardTotal({ value, icon, label, subtitle }: CardTotalInterface) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm dark:bg-dark-800 dark:border-dark-800 dark:text-white">
      <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden dark:bg-dark-900 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
        {icon}
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
          {label}
        </p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-bold leading-snug text-blue-gray-900 dark:text-white">
          {value}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4 dark:border-gray-900">
        <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default CardTotal;
