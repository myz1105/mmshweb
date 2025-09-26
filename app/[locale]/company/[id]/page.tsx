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
import { StarProgressBar } from "../utils";
import { useCompany } from "../contexts/company-context";
import { Company } from "../types";
import { useClient } from "@/src/contexts/legacy/profile-management/client-context";
import { useEffect, useState } from "react";
import { CompanyDetails } from "../components/company-ui";
import { contactIconMap } from "../../shipping/types";
import BankTable from "../components/bank-table";
import DocTable from "../components/doc-table";
import EmployeeTable from "../components/employee-table";
import CompanyContracts from "../components/company-contract";

const stateMap = {
  0: "Inactive",
  1: "Pending",
  2: "Active",
  3: "Suspended",
};

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
  const params = useParams(); // { locale: 'en', id: '1' }
  const { id, locale } = params;
  const { companies } = useCompany();
  const { getImage } = useClient();
  const [company, setCompany] = useState<Company | null>(null);
  useEffect(() => {
    if (!companies) return;
    const foundCompany = companies.find(
      (comp: Company) => comp.Id.toString() === id,
    );
    if (!foundCompany) {
      notFound();
    } else {
      setCompany(foundCompany);
    }
  }, [companies, id]);
  const logoUrl = company?.Img?.Name ? getImage(company.Img.Name) : undefined;
  const tabs = [
    "Details",
    "Employees",
    "Loads",
    "Shippings",
    "Contracts",
    "Settings",
  ];

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-1 py-3 max-w-5xl mx-3">
      <Card className="shadow-none dark:border-default-100">
        <div className="flex flex-col p-4 gap-3">
          <div className="flex">
            <div className="flex flex-col items-start justify-between lg:flex-row p-4 gap-3 grow">
              <div className="flex items-start gap-3">
                {logoUrl && (
                  <Badge
                    content={stateMap[company.State as keyof typeof stateMap]}
                    placement="bottom-right"
                    color={
                      company.State === 0
                        ? "danger"
                        : company.State === 2
                          ? "success"
                          : "warning"
                    }
                    size="sm"
                    className="px-1 text-[10px] font-semibold border-none"
                  >
                    <Avatar
                      src={logoUrl}
                      alt={`${company.Name} logo`}
                      className="w-20 h-20 text-large"
                      name={company.Name.substring(0, 2).toUpperCase()}
                    />
                  </Badge>
                )}
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-semibold text-center">
                    {company.Name}
                  </h4>
                  <div className="flex gap-1 items-center">
                    <StarProgressBar
                      value={3.5}
                      max={5}
                      size={16}
                      color="primary"
                    />
                    <Icon
                      icon="mdi:file-document-check"
                      className="text-green-700"
                      fontSize={16}
                    />
                    <div className="text-sm text-gray-500 flex items-center">
                      <Icon icon="material-symbols:recommend" fontSize={16} />{" "}
                      {10}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-md font-semibold mb-2  text-gray-500">
                  Contacts
                </h5>
                {company.Contacts && company.Contacts.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {company.Contacts.map((contact) => (
                      <div
                        key={contact.Id}
                        className="text-sm flex gap-1 items-center"
                      >
                        {
                          contactIconMap[
                            contact.Type as keyof typeof contactIconMap
                          ]
                        }
                        {contact.Data}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No contacts available</p>
                )}
              </div>
              <div>
                <h5 className="text-md font-semibold mb-2  text-gray-500">
                  Address
                </h5>
                {company.Contacts && company.Contacts.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {company.Addresses.map((address) => (
                      <div
                        key={address.Id}
                        className="text-sm flex gap-1 items-center"
                      >
                        {address.FormattedAddress}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No contacts available</p>
                )}
              </div>
            </div>
            <div className="flex-none">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="p-2 w-auto"
                  >
                    <Icon icon="ri:more-fill" fontSize={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Card>
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
                  <p className=" text-md  capitalize">{company.Name}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    Type
                  </h5>
                  <p className=" text-md  capitalize">{company.Type.Type}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    INN
                  </h5>
                  <p className=" text-md  capitalize">{company.Inn}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2  text-gray-500">
                    Oked
                  </h5>
                  <p className=" text-md  capitalize">{company.Oked}</p>
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
            <BankTable banks={company.Banks} />
            <div className="flex justify-between items-center">
              <h5 className="text-md font-semibold mb-2  text-gray-500">
                Documents
              </h5>
              <Button variant="light" size="sm">
                <Icon icon="akar-icons:plus" className="mr-1" />
                Add Document
              </Button>
            </div>
            <DocTable documents={company.Documents} />
          </div>
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}>
          <EmployeeTable />
        </Tab>
        <Tab key={tabs[2]} title={tabs[2]}></Tab>
        <Tab key={tabs[3]} title={tabs[3]}></Tab>
        <Tab key={tabs[4]} title={tabs[4]}>
          <CompanyContracts />
        </Tab>
        <Tab key={tabs[5]} title={tabs[5]}></Tab>
      </Tabs>
    </div>
  );
}
