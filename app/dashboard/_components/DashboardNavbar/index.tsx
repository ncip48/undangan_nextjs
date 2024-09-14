"use client";

import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { Bars3Icon, QrCodeIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";

function DashboardNavbar({
  active,
  onPressMenu,
}: {
  active: string;
  onPressMenu: () => void;
}) {
  return (
    <nav className="w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center">
          <Bars3Icon
            className="w-5 h-5 text-inherit cursor-pointer"
            onClick={onPressMenu}
          />
          <div className="capitalize ml-5">
            <nav aria-label="breadcrumb" className="w-max">
              <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                  <Link href="/dashboard">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100 dark:text-white">
                      dashboard
                    </p>
                  </Link>
                  <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none dark:text-white">
                    /
                  </span>
                </li>
                <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal dark:text-white">
                    {active}
                  </p>
                </li>
              </ol>
            </nav>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 dark:text-white">
              {active}
            </h6>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-900 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-gray-200 focus:border-gray-900 dark:bg-dark-800 dark:text-gray-400 dark:border-gray-700 dark:focus:border-gray-600"
                placeholder="Search"
              />
            </div>
          </div>
          <Link href="/akun" className="p-2 dark:bg-dark-800 rounded-full">
            <UserIcon className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
