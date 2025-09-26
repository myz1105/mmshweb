"use client";
import React from "react";
import Sidebar from "@/components/main_components/sidebar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/src/components/layout/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  console.log("Rendering MainLayout");
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow pt-1">
        <div className="h-full w-full">
          <main className="container mx-auto max-w-7xl px-6 flex-grow h-full">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
