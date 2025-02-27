"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { ScrollShadow } from "@heroui/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex h-[98vh] pt-1 ">
        <Sidebar />
        <div className="relative w-full">
          <ScrollShadow className="h-full w-full pb-10">
            <main className="h-full w-full">{children}</main>
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
