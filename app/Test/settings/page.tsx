"use client";
import { useState } from "react";
import Profile from "../settings/settly/Profile";
import Application from "./settly/Application";
import Appearance from "./settly/Appearance";
import Account from "./settly/Account";
import { Tabs, Tab } from "@heroui/react"

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage() {
  const tabs = ["Profile", "Account", "Appearance", "Application"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className=" flex flex-col  px-6 py-3 max-w-3xl">
      <h1 className="text-[5vh] font-bold">Settings</h1>
      <Tabs aria-label="Options" fullWidth >
        <Tab key={tabs[0]} title={tabs[0]}>
          <Profile />
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}>
          <Account />
        </Tab>
        <Tab key={tabs[2]} title={tabs[2]}>
          <Appearance />
        </Tab>
        <Tab key={tabs[3]} title={tabs[3]}>
          <Application />
        </Tab>
      </Tabs>
    </div>  
  );
}
