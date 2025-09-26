"use client";
import CountrySelection from "@/components/country-selection";
import {
  Input,
  Accordion,
  AccordionItem,
  Textarea,
  InputOtp,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import type { Selection } from "@heroui/react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

const CreatePartnerDetails: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    e.target.value = value;
  };

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const selectedValue = Array.from(selectedKeys)[0] || "Select Your Bank";

  return (
    <div className="max-w-3xl flex flex-col gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Add New Partner</div>

      {/* Partner details */}
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small mb-4">Partner Details</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 gap-4">
          <Input
            label="Full name"
            labelPlacement={"outside"}
            isRequired
            placeholder="Enter full name"
            type="text"
          />
          <Input
            label="Type"
            labelPlacement={"outside"}
            isRequired
            placeholder="Enter type"
            type="text"
          />
        </div>
        <div className="flex w-full flex-col">
          <h3 className="text-default-500 text-small mb-4">
            Choose type<span className="text-red-600 mx-[2px]">*</span>
          </h3>
          <Tabs aria-label="Options">
            <Tab key="inn" title="INN">
              <Card>
                <CardBody>
                  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <form className="flex flex-col gap-4 w-full">
                      <Input
                        label="Enter INN"
                        labelPlacement={"outside"}
                        placeholder="Enter INN number"
                        type="text"
                        maxLength={12}
                        onInput={handleChange}
                      />
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="okep" title="OKEP">
              <Card>
                <CardBody>
                  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <form className="flex flex-col gap-4 w-full">
                      <Input
                        label="Enter OKEP"
                        labelPlacement={"outside"}
                        placeholder="Enter OKEP number"
                        type="text"
                        maxLength={10}
                        onInput={handleChange}
                      />
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        {/* Address Section */}
        <h3 className="text-default-500 text-small my-4">Partner&#39;s address</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="w-1/2">
           Country
            <CountrySelection  onSelect={() => {}} />
          </div>
          <div className="w-1/2">
            <Input
              label="City"
              labelPlacement={"outside"}
              isRequired
              placeholder="City"
              type="text"
            />
          </div>
        </div>
        <div className="flex w-1/2 mt-4 items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            label="ZIP/Postal code"
            labelPlacement={"outside"}
            isRequired
            placeholder="Enter zip code"
            type="text"
          />
        </div>
        <div>
          <h3 className="text-default-500 text-small my-4">Add Bank Account</h3>
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Bank Account"
              title="Bank Account"
            >
              <div className="flex flex-col gap-4">
                <div className="text-default-500">
                  Enter your bank account number:
                </div>
                <InputOtp
                  minLength={6}
                  maxLength={16}
                  length={8}
                  radius={"full"}
                  className="m-1.5"
                />
                <Input
                  label="Account Type"
                  labelPlacement={"outside"}
                  placeholder="Enter your account type"
                  type="text"
                  className="mb-2"
                />
                <div className="text-default-500 flex justify-center align-center">
                  Click this button to choose your bank
                </div>
                <div className="mb-2 p-2 flex justify-center items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="capitalize" variant="bordered">
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      aria-label="Select a Bank"
                      selectedKeys={selectedKeys}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={(keys) =>
                        setSelectedKeys(new Set(keys as Set<string>))
                      }
                    >
                      <DropdownItem key="bank 1">Bank 1</DropdownItem>
                      <DropdownItem key="bank 2">Bank 2</DropdownItem>
                      <DropdownItem key="bank 3">Bank 3</DropdownItem>
                      <DropdownItem key="bank 4">Bank 4</DropdownItem>
                      <DropdownItem key="bank 5">Bank 5</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Description" title="Description">
              <div>
                <Textarea
                  className="w-full"
                  minRows={3}
                  maxRows={6}
                  placeholder="Enter your description"
                />
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CreatePartnerDetails;
