"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { Footer } from "@/components/footer";
import { ScrollShadow } from "@heroui/react";
import { getLocalStorage } from "@/utils/localstorage";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [loginConfig, setLoginConfig] = useState<any | null>();
  useEffect(() => {
    setLoginConfig(getLocalStorage("loginConfig"));
    console.log(loginConfig);
  }, []);
  console.log("salom");
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Sidebar />
        <ScrollShadow className="h-full w-full" hideScrollBar>
          <main className="h-full w-full mb-2">{children}</main>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default MainLayout;
