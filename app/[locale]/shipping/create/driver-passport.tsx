import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  Input,
  Tab,
  Tabs,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { FileDropzone } from "../utils";
// TODO: Update the import path below to the correct relative path where Contact and ContactInformation are defined.
// Example (update as needed):
// import { Contact, ContactInformation } from "../../company/utils";
import { Contact, ContactInformation } from "../../company/utils";
import { useShipping } from "../contexts/shipping-creation-context";
import { Driver, Passport, PassportType } from "../types";

const PassportTypes = [
  {
    id: 1,
    label: "International Passport",
  },
  {
    id: 2,
    label: "Id Card",
  },
];

const CreateDriverPassport: React.FC = () => {
  const { driver, updateDriver } = useShipping();
  const contactTypes = [
    "Phone",
    "Telegram",
    "Whatsapp",
    "Instagram",
    "Web",
    "Email",
    "Others",
  ];

  return (
    <div className="max-w-3xl flex flex-col  justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Driver passport</div>
      <Tabs
        aria-label="Dynamic tabs"
        items={PassportTypes}
        selectedKey={
          driver && driver.passport
            ? driver.passport.type === PassportType.IdCard
              ? "Id Card"
              : "International Passport"
            : undefined
        }
        onSelectionChange={(val) => {
          let data: Passport = { type: PassportType.IdCard };
          if (driver && driver.passport) {
            data = { ...driver.passport };
          }
          if (val === "Id Card") {
            data = { ...data, type: PassportType.IdCard };
          } else {
            data = { ...data, type: PassportType.InternationalPassport };
          }
          if (driver) {
            updateDriver({ ...driver, passport: data });
          } else {
            updateDriver({ passport: data });
          }
        }}
      >
        <Tab key="Id Card" title="Id Card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-1 grow">
              <div className="w-full ">
                <FileDropzone
                  files={
                    driver && driver.passport && driver.passport.frontSide
                      ? [driver.passport.frontSide]
                      : undefined
                  }
                  onChange={(val: File[]) => {
                    let data: Passport | undefined;
                    if (driver && driver.passport) {
                      data = { ...driver.passport, frontSide: val[0] };
                    } else {
                      data = { frontSide: val[0] };
                    }
                    if (driver) {
                      updateDriver({ ...driver, passport: data });
                    } else {
                      updateDriver({ passport: data });
                    }
                  }}
                  className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
                  accept={{ "image/*": [] }}
                  maxFiles={1}
                  isImageOverride={true}
                />
              </div>
              <div className="flex flex-wrap gap-2 font-semibold text-default-700">
                <div>Id Card Front Side</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 grow">
              <div className="w-full ">
                <FileDropzone
                  files={
                    driver && driver.passport && driver.passport.backSide
                      ? [driver.passport.backSide]
                      : undefined
                  }
                  onChange={(val: File[]) => {
                    let data: Passport | undefined;
                    if (driver && driver.passport) {
                      data = { ...driver.passport, backSide: val[0] };
                    } else {
                      data = { backSide: val[0] };
                    }
                    if (driver) {
                      updateDriver({ ...driver, passport: data });
                    } else {
                      updateDriver({ passport: data });
                    }
                  }}
                  className="border-2 border-dashed border-default min-h-[300px] max-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
                  accept={{ "image/*": [] }}
                  maxFiles={1}
                  isImageOverride={true}
                />
              </div>
              <div className="flex flex-wrap gap-2 font-semibold text-default-700">
                <div>Id Card Back Side</div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          key="International Passport"
          title="International Passport"
          className="w-full"
        >
          <div className="grid grid-cols-1 justify-self-stretch">
            <div className="flex flex-col gap-1 grow">
              <div className="w-full ">
                <FileDropzone
                  files={
                    driver && driver.passport && driver.passport.frontSide
                      ? [driver.passport.frontSide]
                      : undefined
                  }
                  onChange={(val: File[]) => {
                    let data: Passport | undefined;
                    if (driver && driver.passport) {
                      data = { ...driver.passport, frontSide: val[0] };
                    } else {
                      data = { frontSide: val[0] };
                    }
                    if (driver) {
                      updateDriver({ ...driver, passport: data });
                    } else {
                      updateDriver({ passport: data });
                    }
                  }}
                  className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
                  accept={{ "image/*": [] }}
                  maxFiles={1}
                  isImageOverride={true}
                />
              </div>
              <div className="flex flex-wrap gap-2 font-semibold text-default-700">
                <div>Upload Driver's International Passport</div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      <Divider className="my-1" />
      <div className="text-xl text-default-600 dark:text-default-400 my-2">
        Driver information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <Input
          label="Name"
          placeholder="Name..."
          variant="faded"
          labelPlacement="outside"
          value={driver ? driver.name : ""}
          onValueChange={(val) => {
            if (driver) {
              updateDriver({ ...driver, name: val });
            } else {
              updateDriver({ name: val });
            }
          }}
        />
        <Input
          label="Surname"
          placeholder="Surname..."
          variant="faded"
          labelPlacement="outside"
          value={driver ? driver.surname : ""}
          onValueChange={(val) => {
            if (driver) {
              updateDriver({ ...driver, surname: val });
            } else {
              updateDriver({ surname: val });
            }
          }}
        />
      </div>

      <div className="text-xl text-default-600 dark:text-default-400 my-2">
        Contacts
      </div>
      <Card shadow="none">
        <CardBody>
          <div className="flex items-start justify-start gap-3 flex-wrap w-full">
            {driver &&
              driver.contacts &&
              driver.contacts.map((contact: Contact) => (
                <ContactInformation
                  key={contact.id}
                  value={contact}
                  add={() => {
                    var count = driver.contacts.length;
                    if (driver) {
                      updateDriver({
                        ...driver,
                        contacts: [
                          ...driver.contacts,
                          {
                            id: count + 1,
                            type: contactTypes[count % 7],
                            data: "",
                          },
                        ],
                      });
                    } else {
                      updateDriver({
                        contacts: [
                          {
                            id: count + 1,
                            type: contactTypes[count % 7],
                            data: "",
                          },
                        ],
                      });
                    }
                  }}
                  remove={(val) => {
                    var prevContacts = driver.contacts;
                    const index = prevContacts.findIndex(
                      (c: Contact) => c.id === val,
                    );
                    console.log(index);
                    if (index === -1) {
                      return;
                    }
                    const newContacts = [...prevContacts];
                    newContacts.splice(index, 1);
                    if (driver) {
                      updateDriver({ ...driver, contacts: newContacts });
                    } else {
                      updateDriver({ contacts: newContacts });
                    }
                  }}
                  onChange={(val) => {
                    var prevContacts = driver.contacts;
                    const index = prevContacts.findIndex(
                      (c: Contact) => c.id === val.id,
                    );
                    if (index === -1) {
                      return;
                    }
                    const newContacts = [...prevContacts];
                    newContacts[index] = val;
                    if (driver) {
                      updateDriver({ ...driver, contacts: newContacts });
                    } else {
                      updateDriver({ contacts: newContacts });
                    }
                  }} // Pass the updateContact function
                />
              ))}
          </div>
        </CardBody>
      </Card>

      <Divider className="my-1" />
    </div>
  );
};
export default CreateDriverPassport;
