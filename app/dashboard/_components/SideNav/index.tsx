"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowLeftStartOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { getSession, logout } from "@/app/lib";
import useEffectAfterMount from "@/utils/useEffectAfterMount";

interface SidenavProps {
  brandImg?: string;
  brandName?: string;
  routes: Array<{
    icon: string;
    name: string;
    path: string;
  }>;
  stateSidebar: boolean;
  setOpenNav?: () => void;
}

export function Sidenav({
  brandImg = "/img/logo-ct.png",
  brandName = "Absensi App",
  routes = [],
  stateSidebar = false,
  setOpenNav,
}: SidenavProps) {
  const [newRoutes, setNewRoutes] = useState<any>([]);
  const pathname = usePathname();
  const openSidenav = stateSidebar;
  const sidenavType = "transparent";
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  useEffectAfterMount(() => {
    getNewRoutes();
  }, []);

  const getNewRoutes = async () => {
    const storage = await getSession();
    const role = storage?.user?.profile?.role;
    const oldRoutes = routes;
    const newRoutes = oldRoutes.filter((route: any) =>
      route.role.includes(role)
    );
    setNewRoutes(newRoutes);
  };

  //find the current pathname in newRoutes childs then find the child path, if same set to true
  function findParentRoute(pathname: string, routes: any) {
    for (const route of routes) {
      if (route.childs) {
        for (const child of route.childs) {
          if (child.path === pathname) {
            return route;
          }
        }
      }
    }
    return null;
  }

  // console.log(findParentRoute(pathname, newRoutes));

  // State to keep track of which parent routes are expanded
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  useEffect(() => {
    const parent = findParentRoute(pathname, routes);
    if (parent) {
      setExpandedRoutes([...expandedRoutes, parent.name]);
    } else {
      setExpandedRoutes([]);
    }
  }, [pathname]);

  // Function to toggle the visibility of child routes
  const toggleExpand = (name: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(name)
        ? prev.filter((route) => route !== name)
        : [...prev, name]
    );
  };

  // Recursive function to render routes
  const renderRoutes = (routes: any[], pathname: string) => {
    return routes.map(({ icon, name, path, childs }: any) => (
      <div key={name} className="relative">
        {childs ? (
          <button
            onClick={() => toggleExpand(name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-sans font-bold text-center transition-all ${
              path === pathname
                ? "bg-dark-800 text-white shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20"
                : "text-gray-500 hover:bg-dark-800"
            }`}
          >
            {icon}
            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
              {name}
            </p>
            <span
              className={`ml-auto transition-transform ${
                expandedRoutes.includes(name) ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </button>
        ) : (
          <Link href={path} passHref>
            <button
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-sans font-bold text-center transition-all ${
                path === pathname
                  ? "bg-dark-800 text-white shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20"
                  : "text-gray-500 hover:bg-dark-800"
              }`}
            >
              {icon}
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                {name}
              </p>
            </button>
          </Link>
        )}
        {childs && expandedRoutes.includes(name) && (
          <div className="ml-4 mt-2">{renderRoutes(childs, pathname)}</div>
        )}
      </div>
    ));
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50  h-[calc(100vh)] w-72  transition-transform duration-300 shadow-2xl dark:bg-dark-900`}
    >
      <div className={`relative`}>
        <div className="py-6 px-8 flex items-center justify-between">
          <Link href="/dashboard" className="text-center w-full">
            <h6 className="block antialiased tracking-normal font-sans text-base font-bold leading-relaxed text-white">
              {brandName}
            </h6>
          </Link>
          <XMarkIcon
            className="w-5 h-5 text-inherit lg:hidden cursor-pointer"
            onClick={setOpenNav}
          />
        </div>
      </div>
      <div className="m-4 mb-4 flex flex-col gap-1">
        {renderRoutes(newRoutes, pathname)}
        <button
          onClick={(e) => {
            logout();
          }}
          className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white active:bg-white/30 dark:text-gray-500 w-full flex items-center gap-4 px-4 capitalize`}
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-inherit" />
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
            Logout
          </p>
        </button>
      </div>
    </aside>
  );
}
