"use client";
import { notFound, useParams } from "next/navigation";
import { Metadata } from "next";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Chip,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import BankTable from "../components/bank-table";
import DocTable from "../components/doc-table";
import EmployeeTable from "../components/employee-table";
import CompanyContracts from "../components/company-contract";
import { useCompany } from "../contexts/company-context";
import { useClient } from "@/src/contexts/legacy/profile-management/client-context";
import { useEffect, useState } from "react";
import { Company } from "../types";

const data = [
  {
    title: "Total Users",
    value: "5,400",
    change: "33%",
    changeType: "positive",
    trendChipPosition: "top",
    iconName: "solar:users-group-rounded-linear",
  },
  {
    title: "Total Sales",
    value: "$15,400",
    change: "0.0%",
    changeType: "neutral",
    trendChipPosition: "top",
    iconName: "solar:wallet-money-outline",
  },
  {
    title: "Net Profit",
    value: "$10,400",
    change: "3.3%",
    changeType: "negative",
    trendChipPosition: "top",
    iconName: "solar:hand-money-linear",
  },
  {
    title: "Total truck delivery",
    value: "5",
    change: "3.3%",
    changeType: "neutral",
    trendChipPosition: "top",
    iconName: "fontisto:truck",
  },
  {
    title: "Total shipments",
    value: "15",
    change: "3.3%",
    changeType: "neutral",
    trendChipPosition: "top",
    iconName: "hugeicons:shipment-tracking",
  },
];

export default function CompanyPage() {
  const { currentCompany } = useCompany();

  if (!currentCompany) {
    return <div>Loading...</div>;
  }

  const tabs = [
    "Details",
    "Employees",
    "Loads",
    "Shippings",
    "Contracts",
    "Settings",
  ];

  return (
    <div>
      <Tabs aria-label="Options" classNames={{ tab: "w-[120px]" }}>
        <Tab key={tabs[0]} title={tabs[0]}>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
              <h5 className="text-md font-semibold mb-2  text-gray-500">
                Company
              </h5>
              <Button variant="light" size="sm">
                <Icon icon="akar-icons:edit" className="mr-1" />
                Edit Company
              </Button>
            </div>
            <Card className="shadow-small">
              <div className="flex flex-col lg:flex-row p-8 justify-between gap-6">
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    Name
                  </h5>
                  <p className=" text-md  capitalize">{currentCompany.Name}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    Type
                  </h5>
                  <p className=" text-md  capitalize">
                    {currentCompany.Type.Type}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    INN
                  </h5>
                  <p className=" text-md  capitalize">{currentCompany.Inn}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    Oked
                  </h5>
                  <p className=" text-md  capitalize">{currentCompany.Oked}</p>
                </div>
              </div>
            </Card>
            <div className="flex justify-between items-center">
              <h5 className="text-md font-semibold mb-2  text-gray-500">
                Banks
              </h5>
              <Button variant="light" size="sm">
                <Icon icon="akar-icons:plus" className="mr-1" />
                Add Bank
              </Button>
            </div>
            <BankTable banks={currentCompany.Banks} />
            <div className="flex justify-between items-center">
              <h5 className="text-md font-semibold mb-2  text-gray-500">
                Documents
              </h5>
              <Button variant="light" size="sm">
                <Icon icon="akar-icons:plus" className="mr-1" />
                Add Document
              </Button>
            </div>
            <DocTable documents={currentCompany.Documents} />
          </div>
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}>
          <EmployeeTable />
        </Tab>
        <Tab key={tabs[2]} title={tabs[2]}></Tab>
        <Tab key={tabs[3]} title={tabs[3]}></Tab>
        <Tab key={tabs[4]} title={tabs[4]}>
          <CompanyContracts companyId={currentCompany.Id} />
        </Tab>
        <Tab key={tabs[5]} title={tabs[5]}></Tab>
      </Tabs>
    </div>
  );
}
