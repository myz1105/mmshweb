import React, { useCallback, useRef, useState } from "react";
import { Card, CardBody, Chip, Divider, Image, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { FileDropzone } from "../utils";
import { Contact, ContactInformation } from "../../company/utils";
import { useShipping } from "../contexts/shipping-creation-context";
import { Passport } from "../types";

const CreateDriverDetails: React.FC = () => {
  const [files1, setFiles1] = React.useState<File[]>([]);
  const [files2, setFiles2] = React.useState<File[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, type: "Phone", data: "" },
  ]);

  const { driver, updateDriver } = useShipping();

  return (
    <div className="max-w-3xl flex flex-col  justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Driver Card documents</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={
                driver && driver.driverCard && driver.driverCard.frontSide
                  ? [driver.driverCard.frontSide]
                  : undefined
              }
              onChange={(val: File[]) => {
                let data: Passport | undefined;
                if (driver && driver.driverCard) {
                  data = { ...driver.driverCard, frontSide: val[0] };
                } else {
                  data = { frontSide: val[0] };
                }
                if (driver) {
                  updateDriver({ ...driver, driverCard: data });
                } else {
                  updateDriver({ driverCard: data });
                }
              }}
              className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Driver Card Front Side</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={
                driver && driver.driverCard && driver.driverCard.backSide
                  ? [driver.driverCard.backSide]
                  : undefined
              }
              onChange={(val: File[]) => {
                let data: Passport | undefined;
                if (driver && driver.driverCard) {
                  data = { ...driver.driverCard, backSide: val[0] };
                } else {
                  data = { backSide: val[0] };
                }
                if (driver) {
                  updateDriver({ ...driver, driverCard: data });
                } else {
                  updateDriver({ driverCard: data });
                }
              }}
              className="border-2 border-dashed border-default min-h-[300px] max-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Driver Card Back Side</div>
          </div>
        </div>
      </div>

      <Divider className="my-1" />
    </div>
  );
};
export default CreateDriverDetails;
