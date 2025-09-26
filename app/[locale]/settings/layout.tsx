"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { Footer } from "@/components/footer";
import { ScrollShadow } from "@heroui/react";
import { getLocalStorage } from "@/utils/localstorage";
import { redirect } from "next/navigation";
import { SettingsProvider } from "./settings-context";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Sidebar />
        <ScrollShadow className="h-[92vh] w-full overflow-auto">
          <SettingsProvider>
            <main className="h-full w-full pb-2">{children}</main>
          </SettingsProvider>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default SettingsLayout;
