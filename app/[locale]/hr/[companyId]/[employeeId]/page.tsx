"use client";
import { Tab, Tabs } from "@heroui/react";

export default function EmployeePage() {
  const tabs = ["Details", "Documents", "Loads", "Shippings", "Contracts"];

  return (
    <div>
      <Tabs aria-label="Options" classNames={{ tab: "w-[120px]" }}>
        <Tab key={tabs[0]} title={tabs[0]}></Tab>
        <Tab key={tabs[1]} title={tabs[1]}></Tab>
        <Tab key={tabs[2]} title={tabs[2]}></Tab>
        <Tab key={tabs[3]} title={tabs[3]}></Tab>
        <Tab key={tabs[4]} title={tabs[4]}></Tab>
      </Tabs>
    </div>
  );
}
