"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const IdentityLayout = ({ children }: { children: React.ReactNode }) => {
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

export default IdentityLayout;
