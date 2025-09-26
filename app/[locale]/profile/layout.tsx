"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { Footer } from "@/components/footer";
import { ScrollShadow } from "@heroui/react";
import { getLocalStorage } from "@/utils/localstorage";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Sidebar />
        <ScrollShadow className="h-[92vh] w-full overflow-auto" size={20}>
          <main className="h-max min-h-full w-full mb-2 p-4">{children}</main>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default MainLayout;
