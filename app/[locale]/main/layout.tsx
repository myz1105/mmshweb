"use client";
import React, { lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar";
const Sidebar = lazy(() => import("@/components/main_components/sidebar"));
import { Footer } from "@/components/footer";
import { ScrollShadow } from "@heroui/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        <ScrollShadow className="h-[92vh] w-full overflow-auto">
          <main className="h-full w-full pb-2">{children}</main>
        </ScrollShadow>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
