import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Checkbox,
  Chip,
  Divider,
  Image,
  Input,
  Tab,
  Tabs,
} from "@heroui/react";
import { Contact, ContactInformation } from "../../company/utils";

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

const CreateShippingDetailes: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, type: "Phone", data: "" },
  ]);

  const [hasTruckOwnerInfo, setTruckOwnerInfo] = useState(false);

  const [selected, setSelected] = React.useState("Id Card");

  return (
    <div className="max-w-3xl flex flex-col  justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-3">Shipping Details</div>
      <div className="text-xl text-default-600 dark:text-default-400 mb-2">
        Owner information
      </div>
      <Checkbox
        isSelected={hasTruckOwnerInfo}
        onValueChange={(val) => {
          setTruckOwnerInfo(val);
        }}
      >
        Truck belong to someone else?
      </Checkbox>
      <div
        className={
          hasTruckOwnerInfo ? "w-full" : "w-full pointer-events-none opacity-70"
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <Input
            label="Owner full name"
            placeholder="Owner information"
            variant="faded"
            labelPlacement="outside"
          />
        </div>

        <div className="text-xl text-default-600 dark:text-default-400 my-2">
          Contacts
        </div>
        <Card shadow="none">
          <CardBody>
            <div className="flex items-start justify-start gap-3 flex-wrap w-full">
              {contacts.map((contact: Contact) => (
                <ContactInformation
                  key={contact.id}
                  value={contact}
                  add={() => {}}
                  remove={(val) => {}}
                  onChange={(val) => {
                    setContacts((prevContacts) => {
                      const index = prevContacts.findIndex(
                        (c) => c.id === val.id,
                      );
                      if (index === -1) {
                        return prevContacts;
                      }
                      const newContacts = [...prevContacts];
                      newContacts[index] = val;
                      return newContacts;
                    });
                  }} // Pass the updateContact function
                />
              ))}
            </div>
          </CardBody>
        </Card>

        <Divider className="my-1" />
      </div>

      <div className="text-xl text-default-600 dark:text-default-400">
        Shipping Price
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <div className="flex gap-3 flex-wrap">
          <Input
            variant="faded"
            className="max-w-fit"
            description="Shipping price which is paid for the delivery"
            onValueChange={(val) => {}}
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="currency">
                  Currency
                </label>
                <select
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="currency"
                  name="currency"
                  onChange={(val) => {}}
                >
                  <option>$</option>
                  <option>Uzs</option>
                </select>
              </div>
            }
            label="Shipping price"
            labelPlacement="outside"
            type="number"
          />
        </div>
      </div>
      <Divider className="my-1" />
    </div>
  );
};
export default CreateShippingDetailes;
