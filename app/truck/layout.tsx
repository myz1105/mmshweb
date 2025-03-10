"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { ScrollShadow } from "@heroui/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Sidebar />
        <ScrollShadow className="h-[92vh] w-full overflow-auto" size={20}>
          <main className="h-full min-h-full w-full px-2 ">{children}</main>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default MainLayout;
