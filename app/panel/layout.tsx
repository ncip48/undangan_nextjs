"use client";

import { usePathname } from "next/navigation";
import { NavLinks } from "../ui/nav-links";
import { Footer } from "./_components/Footer";
import { Sidenav } from "./_components/SideNav";
import {
  HomeIcon,
  UserCircleIcon,
  DocumentIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
  CreditCardIcon,
  CakeIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import DashboardNavbar from "./_components/DashboardNavbar";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { useEffect, useState } from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const sidenavType = "dark";
  const pathname = usePathname();
  const routes: any = [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/panel/dashboard",
      active: "Home",
      role: [0, 1, 2],
    },
    {
      icon: <DocumentIcon {...icon} />,
      name: "Template",
      path: "/panel/template",
      active: "Template",
      role: [0],
    },
    {
      icon: <CreditCardIcon {...icon} />,
      name: "Transaksi",
      path: "/panel/transaksi",
      active: "Transaksi",
      role: [0, 2],
    },
    {
      icon: <CakeIcon {...icon} />,
      name: "Undangan",
      path: "/panel/undangan",
      active: "Undangan",
      role: [0, 2],
    },
    {
      icon: <ChartBarIcon {...icon} />,
      name: "Laporan",
      path: "/panel/laporan",
      active: "Laporan",
      role: [0],
      childs: [
        {
          icon: <EllipsisHorizontalIcon {...icon} />,
          name: "report absen",
          path: "/report-absen",
          active: "Report Absen",
          role: [1],
        },
        {
          icon: <EllipsisHorizontalIcon {...icon} />,
          name: "report per siswa",
          path: "/report-siswa",
          active: "Report Siswa",
          role: [1],
        },
        {
          icon: <EllipsisHorizontalIcon {...icon} />,
          name: "report per kelas",
          path: "/report-kelas",
          active: "Report Kelas",
          role: [1],
        },
      ],
    },
    {
      icon: <UserIcon {...icon} />,
      name: "User",
      path: "/panel/user",
      active: "User",
      role: [0],
    },
  ];

  const [openSidenav, setOpenSidenav] = useState(true);

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window?.innerWidth : 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffectAfterMount(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isDesktop = width >= 992;

  useEffect(() => {
    setOpenSidenav(isDesktop ? true : false);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      setOpenSidenav(false);
    }
  }, [pathname, isDesktop]);

  const findActiveRoute = (routes: any[], pathname: string) => {
    // Check if any route's path matches the pathname or if any of its children match
    for (const route of routes) {
      if (route.path === pathname) {
        return route.active;
      }
      if (route.childs) {
        for (const child of route.childs) {
          if (child.path === pathname) {
            return child.active; // Return child's active label if child matches
          }
        }
      }
    }
    return "Home"; // Default active label if no match is found
  };

  return (
    <div className="dark min-h-screen bg-secondarydark dark:bg-secondarydark">
      <Sidenav
        setOpenNav={() => setOpenSidenav(!openSidenav)}
        routes={routes}
        stateSidebar={openSidenav}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <DashboardNavbar
        onPressMenu={() => setOpenSidenav(!openSidenav)}
        active={findActiveRoute(routes, pathname)}
        className={!openSidenav ? "px-8" : "xl:pl-80 px-8"}
      />
      <div className={`p-4 px-8 ${!openSidenav ? "" : "xl:ml-80 xl:pl-0"}`}>
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        {children}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
