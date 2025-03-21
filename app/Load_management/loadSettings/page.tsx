"use client";
import { useState } from "react";
import LoadManager from "./loadPacks/loadManager";
import TruckManager from "./truckPacks/truckManager";
import { Tabs, Tab } from "@heroui/react";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function loadSettings() {
  const tabs = ["Load Management", "Truck Management"];

  return (
    <div className=" flex flex-col  px-6 py-3 max-w-3xl">
      <h1 className="text-[5vh] font-bold">Load Management Settings</h1>
      <Tabs aria-label="Options" fullWidth>
        <Tab key={tabs[0]} title={tabs[0]}>
          <LoadManager />
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}>
          <TruckManager />
        </Tab>
      </Tabs>
    </div>
  );
}
