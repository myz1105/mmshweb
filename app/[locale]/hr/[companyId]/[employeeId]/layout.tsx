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
import { Icon } from "@iconify/react";
import { ContractGraph, contractGraphFakeData } from "../../types";
import { useParams, useRouter } from "next/navigation";
import { StarProgressBar } from "@/app/[locale]/company/utils";

const stateMap = {
  0: "Inactive",
  1: "Pending",
  2: "Active",
  3: "Suspended",
};

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams(); // { locale: 'en', id: '1' }
  const { employeeId } = params;
  const [employee, setEmployee] = useState<ContractGraph>();
  const contracts = contractGraphFakeData;
  const router = useRouter();

  useEffect(() => {
    if (employeeId) {
      const currentEmployee = contracts.find(
        (emp: ContractGraph) => emp.Id.toString() === employeeId,
      );
      setEmployee(currentEmployee);
    }
  }, [employeeId]);

  if (!employeeId) {
    return <div>Loading...</div>;
  }

  const logoUrl = employee?.Img;
  return employee ? (
    <div className="flex flex-col gap-1 py-3  mx-3">
      <Card className="shadow-none dark:border-default-100">
        <div className="flex flex-col p-4 gap-3">
          <div className="flex justify-between">
            <div className="flex max-w-5xl flex-col items-start justify-between lg:flex-row p-4 gap-3 grow">
              <div className="flex items-start gap-3">
                {logoUrl && (
                  <Badge
                    content={employee.Status}
                    placement="bottom-right"
                    size="sm"
                    className="px-1 text-[10px] font-semibold border-none"
                  >
                    <Avatar
                      src={logoUrl}
                      alt={`${employee.Name} logo`}
                      className="w-20 h-20 text-large"
                      name={employee.Name.substring(0, 2).toUpperCase()}
                    />
                  </Badge>
                )}
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-semibold text-center">
                    {employee.Name + " " + employee.Surname}
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
                <div className="text-sm flex gap-1 items-center">
                  {employee.Contacts}
                </div>
              </div>
              <div>
                <h5 className="text-md font-semibold mb-2  text-gray-500">
                  Company
                </h5>
                <div className="text-sm flex gap-1 items-center">
                  {employee.Company}
                </div>
              </div>
            </div>
            <div className="flex-none flex flex-row ms-5">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="p-2 w-auto"
                onPress={() => {
                  router.push(`${employeeId}/permissions`);
                }}
              >
                <Icon icon="uil:setting" fontSize={18} />
              </Button>
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
                  <DropdownItem
                    key="permissions"
                    onPress={() => {
                      router.push(`${employeeId}/permissions`);
                    }}
                  >
                    Permissions
                  </DropdownItem>
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

export default EmployeeLayout;
