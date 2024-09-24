"use client";

import React, { PropsWithChildren, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import Navbar from "../components/Navbar";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`${isSidebarCollapsed ? "" : "md:pl-64"} flex w-full flex-col bg-gray-50 dark:bg-dark-bg`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
