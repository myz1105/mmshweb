import React, { useCallback, useRef, useState } from "react";
import { Card, CardBody, Chip, Divider, Image, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { FileDropzone } from "../utils";
import { Contact, ContactInformation } from "@/app/company/utils";

const UploadTruckImages: React.FC = () => {
  const [files1, setFiles1] = React.useState<File[]>([]);
  const [files2, setFiles2] = React.useState<File[]>([]);
  const [files3, setFiles3] = React.useState<File[]>([]);
  const [files4, setFiles4] = React.useState<File[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, type: "Phone", data: "" },
  ]);

  return (
    <div className="max-w-3xl flex flex-col  justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Truck Side Images</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 grow">
          <div className="w-full relative">
            <FileDropzone
              files={files1}
              onChange={(val: File[]) => setFiles1(val)}
              className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
              defaultImgSrc="/truck-images/Front.jpg"
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Front Side</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={files2}
              onChange={(val: File[]) => setFiles2(val)}
              className="border-2 border-dashed border-default min-h-[300px] max-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
              defaultImgSrc="/truck-images/Back.jpg"
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Back Side</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={files3}
              onChange={(val: File[]) => setFiles3(val)}
              className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
              defaultImgSrc="/truck-images/Left.jpg"
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Left Side</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={files4}
              onChange={(val: File[]) => setFiles4(val)}
              className="border-2 border-dashed border-default min-h-[300px] max-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
              defaultImgSrc="/truck-images/Right.jpg"
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Right Side</div>
          </div>
        </div>
      </div>

      <Divider className="my-1" />
    </div>
  );
};
export default UploadTruckImages;
