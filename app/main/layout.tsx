"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/main_components/sidebar";
import { Footer } from "@/components/footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <Sidebar />
        <div className="overflow-auto h-screen w-full">
          <main className="container mx-auto max-w-7xl px-6 flex-grow  h-full">
            {" "}
            {/* Allow scrolling on main */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
