"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/main_components/sidebar";
import { Divider } from "@heroui/react";

const MainPage: React.FC = () => {
  return (
    <div className="flex max-h-max mx-1 h-full mb-5">
      <div className="mx-3 h-full border-1 rounded-xl w-full border-default flex flex-row">
        <div className="p-4 h-full basis-1/3 "></div>
        <Divider orientation="vertical" className="h-full" />
        <div className="flex-col basis-2/3"></div>
      </div>
    </div>
  );
};

export default MainPage;
