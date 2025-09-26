"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  Switch,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSettings } from "../../settings-context";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@heroui/button";
import { BaseAddressAPI } from "@/types/api";
import { addToast } from "@heroui/toast";
// Define CompanyType here since the import cannot be resolved
export interface CompanyType {
  Id: number;
  Shortname: string;
  Type: string;
}

export default function AddCompanyType() {
  const router = useRouter();
  useEffect(() => {
    fetchCompanyTypes();
  }, []);

  const [companyType, setCompanyType] = useState<CompanyType>({
    Shortname: "",
    Type: "",
    Id: 0,
  });

  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompanyTypeValid, setIsCompanyTypeValid] = useState(false);

  const fetchCompanyTypes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BaseAddressAPI + "Company/CompanyTypes/Get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        addToast({
          title: "Error",
          description: "Error occured while request.",
          color: "danger",
        });
        return;
      }
      const result = await res.json();
      setCompanyTypes(result);
      setIsLoading(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
      setIsLoading(false);
    }
  };

  const postCompanyType = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BaseAddressAPI + "Company/CompanyTypes/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyType),
      });

      if (!res.ok) {
        addToast({
          title: "Error",
          description: "Error occured while request.",
          color: "danger",
        });
        setIsLoading(false);
        return;
      }
      setCompanyType({ Id: 0, Type: "", Shortname: "" });
      fetchCompanyTypes();

      setIsLoading(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
      setIsLoading(false);
    }
  };
  const deleteCompanyType = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        BaseAddressAPI + "Company/CompanyTypes/Delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        addToast({
          title: "Error",
          description: "Error occured while request.",
          color: "danger",
        });
        setIsLoading(false);
        return;
      }
      fetchCompanyTypes();

      setIsLoading(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (companyType.Shortname && companyType.Type) {
      setIsCompanyTypeValid(true);
    } else {
      setIsCompanyTypeValid(false);
    }
  }, [companyType]);

  return (
    <div className="w-full px-1 py-2">
      <div className="text-xl font-semibold my-5">Company types</div>
      <Card shadow="none">
        <CardHeader className="border-b">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-2">
              <Input
                label="Short form"
                className="basis-1/3"
                labelPlacement="outside"
                placeholder="exp: LTD"
                description="Short name of company type"
                value={companyType.Shortname}
                onValueChange={(e) => {
                  var val = e.toUpperCase();
                  setCompanyType({
                    Shortname: val,
                    Type: companyType.Type,
                    Id: companyType.Id,
                  });
                }}
              ></Input>
              <Input
                label="Company Type"
                className="basis-2/3"
                labelPlacement="outside"
                placeholder="exp: Limited"
                description="Complete field click add button!"
                value={companyType.Type}
                onValueChange={(e) => {
                  var val = e
                    .toLowerCase()
                    .replace(/(^\w|\s+\w)/g, (char) => char.toUpperCase());
                  setCompanyType({
                    Shortname: companyType.Shortname,
                    Type: val,
                    Id: companyType.Id,
                  });
                }}
              ></Input>
            </div>
            <div className="p-2 flex justify-end">
              <Button
                isDisabled={!isCompanyTypeValid || isLoading}
                color="success"
                onPress={() => {
                  postCompanyType();
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Listbox
            aria-label="Listbox menu with descriptions"
            variant="flat"
            items={companyTypes}
          >
            {(item: CompanyType) => (
              <ListboxItem
                key={item.Id}
                className="py-3"
                description={item.Type}
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                    onPress={() => {
                      deleteCompanyType(item.Id);
                    }}
                  >
                    <Icon icon="mi:delete" fontSize={18} />
                  </Button>
                }
              >
                {item.Shortname}
              </ListboxItem>
            )}
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}
