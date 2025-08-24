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
import { Contact, ContactInformation } from "@/app/company/utils";
import { useHRCreation } from "../contexts/hr-creation-context";
import { FileDropzone } from "@/app/shipping/utils";
import { Passport, PassportType } from "@/app/shipping/types";
import { cropFaceFromImage } from "../utils/face-detect-utils";
import Tesseract from "tesseract.js";

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

const CreateEmployeeDetails: React.FC = () => {
  const { employee, updateEmployee, passportImageError } = useHRCreation();
  const [image, setImage] = useState("");

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
      <div className="text-2xl font-semibold mb-5">Documentation</div>
      <Tabs
        aria-label="Dynamic tabs"
        items={PassportTypes}
        selectedKey={
          employee && employee.passport
            ? employee.passport.type === PassportType.IdCard
              ? "Id Card"
              : "International Passport"
            : undefined
        }
        onSelectionChange={(val) => {
          let data: Passport = { type: PassportType.IdCard };
          if (employee && employee.passport) {
            data = { ...employee.passport };
          }
          if (val === "Id Card") {
            data = { ...data, type: PassportType.IdCard };
          } else {
            data = { ...data, type: PassportType.InternationalPassport };
          }
          if (employee) {
            updateEmployee({ ...employee, passport: data });
          } else {
            updateEmployee({ passport: data });
          }
        }}
      >
        <Tab key="Id Card" title="Id Card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-1 grow">
              <div className="w-full ">
                <FileDropzone
                  files={
                    employee && employee.passport && employee.passport.frontSide
                      ? [employee.passport.frontSide]
                      : undefined
                  }
                  onChange={async (val: File[]) => {
                    let data: Passport | undefined;
                    if (val[0]) {
                      const crop = await cropFaceFromImage(
                        URL.createObjectURL(val[0]),
                      );
                      setImage(crop ? crop : "");
                    }
                    if (employee && employee.passport) {
                      data = { ...employee.passport, frontSide: val[0] };
                    } else {
                      data = { frontSide: val[0] };
                    }
                    if (employee) {
                      updateEmployee({ ...employee, passport: data });
                    } else {
                      updateEmployee({ passport: data });
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
                    employee && employee.passport && employee.passport.backSide
                      ? [employee.passport.backSide]
                      : undefined
                  }
                  onChange={(val: File[]) => {
                    let data: Passport | undefined;
                    if (employee && employee.passport) {
                      data = { ...employee.passport, backSide: val[0] };
                    } else {
                      data = { backSide: val[0] };
                    }
                    if (employee) {
                      updateEmployee({ ...employee, passport: data });
                    } else {
                      updateEmployee({ passport: data });
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
                    employee && employee.passport && employee.passport.frontSide
                      ? [employee.passport.frontSide]
                      : undefined
                  }
                  onChange={async (val: File[]) => {
                    let data: Passport | undefined;
                    if (val[0]) {
                      const crop = await cropFaceFromImage(
                        URL.createObjectURL(val[0]),
                      );
                      setImage(crop ? crop : "");
                    }
                    if (employee && employee.passport) {
                      data = { ...employee.passport, frontSide: val[0] };
                    } else {
                      data = { frontSide: val[0] };
                    }
                    if (employee) {
                      updateEmployee({ ...employee, passport: data });
                    } else {
                      updateEmployee({ passport: data });
                    }
                  }}
                  className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
                  accept={{ "image/*": [] }}
                  maxFiles={1}
                  isImageOverride={true}
                />
              </div>
              <div className="flex flex-wrap gap-2 font-semibold text-default-700">
                <div>Upload International Passport</div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
      <div>
        {image && <Image src={image} width={50}></Image>}
        {employee.passport &&
          employee.passport.frontSide &&
          passportImageError && (
            <p className="text-red-500">
              The uploaded document is of poor quality. Please upload a quality
              document again.
            </p>
          )}
      </div>

      <Divider className="my-1" />
      <div className="text-xl text-default-600 dark:text-default-400 my-2">
        Personal information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <Input
          label="Name"
          placeholder="Name..."
          variant="faded"
          labelPlacement="outside"
          value={employee ? employee.name : ""}
          onValueChange={(val) => {
            if (employee) {
              updateEmployee({ ...employee, name: val });
            } else {
              updateEmployee({ name: val });
            }
            console.log(employee);
          }}
        />
        <Input
          label="Surname"
          placeholder="Surname..."
          variant="faded"
          labelPlacement="outside"
          value={employee ? employee.surname : ""}
          onValueChange={(val) => {
            if (employee) {
              updateEmployee({ ...employee, surname: val });
            } else {
              updateEmployee({ surname: val });
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
            {employee &&
              employee.contacts &&
              employee.contacts.map((contact: Contact) => (
                <ContactInformation
                  key={contact.id}
                  value={contact}
                  add={() => {
                    var count = employee.contacts.length;
                    if (employee) {
                      updateEmployee({
                        ...employee,
                        contacts: [
                          ...employee.contacts,
                          {
                            id: count + 1,
                            type: contactTypes[count % 7],
                            data: "",
                          },
                        ],
                      });
                    } else {
                      updateEmployee({
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
                    var prevContacts = employee.contacts;
                    const index = prevContacts.findIndex(
                      (c: Contact) => c.id === val,
                    );
                    console.log(index);
                    if (index === -1) {
                      return;
                    }
                    const newContacts = [...prevContacts];
                    newContacts.splice(index, 1);
                    if (employee) {
                      updateEmployee({ ...employee, contacts: newContacts });
                    } else {
                      updateEmployee({ contacts: newContacts });
                    }
                  }}
                  onChange={(val) => {
                    var prevContacts = employee.contacts;
                    const index = prevContacts.findIndex(
                      (c: Contact) => c.id === val.id,
                    );
                    if (index === -1) {
                      return;
                    }
                    const newContacts = [...prevContacts];
                    newContacts[index] = val;
                    if (employee) {
                      updateEmployee({ ...employee, contacts: newContacts });
                    } else {
                      updateEmployee({ contacts: newContacts });
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
export default CreateEmployeeDetails;
