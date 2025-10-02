"use client";
import {
  Card,
  Avatar,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@heroui/react";
import React, { use, useEffect, useState } from "react";
import { contactIconMap } from "../../shipping/types";
import { Contact, StarProgressBar } from "../utils";
import { useCompany } from "../contexts/company-context";
import { useClient } from "@/src/contexts/legacy/profile-management/client-context";
import { notFound, useParams } from "next/navigation";
import { Company } from "../types";
import { Icon } from "@iconify/react";
import { Address } from "@/src/types/legacy/api";

const stateMap = {
  0: "Inactive",
  1: "Pending",
  2: "Active",
  3: "Suspended",
};

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams(); // { locale: 'en', id: '1' }
  const { id, locale } = params;
  const { fetchCurrentCompany, currentCompany } = useCompany();
  const { getImage } = useClient();

  useEffect(() => {
    if (id) {
      fetchCurrentCompany(id);
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  const logoUrl = currentCompany?.Img?.Name
    ? getImage(currentCompany.Img.Name)
    : undefined;
  return currentCompany ? (
    <div className="flex flex-col gap-1 py-3 max-w-5xl mx-3">
      <Card className="shadow-none dark:border-default-100">
        <div className="flex flex-col p-4 gap-3">
          <div className="flex">
            <div className="flex flex-col items-start justify-between lg:flex-row p-4 gap-3 grow">
              <div className="flex items-start gap-3">
                {logoUrl && (
                  <Badge
                    content={
                      stateMap[currentCompany.State as keyof typeof stateMap]
                    }
                    placement="bottom-right"
                    color={
                      currentCompany.State === 0
                        ? "danger"
                        : currentCompany.State === 2
                          ? "success"
                          : "warning"
                    }
                    size="sm"
                    className="px-1 text-[10px] font-semibold border-none"
                  >
                    <Avatar
                      src={logoUrl}
                      alt={`${currentCompany.Name} logo`}
                      className="w-20 h-20 text-large"
                      name={currentCompany.Name.substring(0, 2).toUpperCase()}
                    />
                  </Badge>
                )}
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-semibold text-center">
                    {currentCompany.Name}
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
                {currentCompany.Contacts &&
                currentCompany.Contacts.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {currentCompany.Contacts.map(
                      (contact: { Id: number; Type: string; Data: string }) => (
                        <div
                          key={contact.Data}
                          className="text-sm flex gap-1 items-center"
                        >
                          {
                            contactIconMap[
                              contact.Type as keyof typeof contactIconMap
                            ]
                          }
                          {contact.Data}
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No contacts available</p>
                )}
              </div>
              <div>
                <h5 className="text-md font-semibold mb-2  text-gray-500">
                  Address
                </h5>
                {currentCompany.Contacts &&
                currentCompany.Contacts.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {currentCompany.Addresses.map(
                      (address: {
                        Id: number;
                        FormattedAddress: string;
                        Location: string;
                        IndexCode: number;
                        Latitude: number;
                        Longitude: number;
                      }) => (
                        <div
                          key={address.FormattedAddress}
                          className="text-sm flex gap-1 items-center"
                        >
                          {address.FormattedAddress}
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No addresses available
                  </p>
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
      {children}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CompanyLayout;
