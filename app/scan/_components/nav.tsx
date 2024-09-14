"use client";

import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { logout } from "../../lib";

function Nav() {
  return (
    <nav className="fixed w-full bg-transparent text-white shadow-none transition-all px-5 py-1 bg-gray-50 dark:bg-dark-800">
      <div className="flex justify-between gap-6 items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ul className="flex flex-wrap items-center w-full rounded-md bg-transparent p-0 transition-all gap-5">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <Link href="/scan">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold dark:text-white">
                    Absen Masuk
                  </p>
                </Link>
              </li>
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <Link href="/scan-out">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100 dark:text-white">
                    Absen Pulang
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <span
            onClick={() => logout()}
            className="p-2 dark:bg-dark-900 rounded-full cursor-pointer"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-inherit" />
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
