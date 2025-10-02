"use client";
import React, { useState } from "react";
import { Divider, Image } from "@heroui/react";
import { Button } from "@heroui/button";
import { FileDropzone } from "../../../shipping/utils";
import { Icon } from "@iconify/react";

const EmployeeContractUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-4 pt-5">
      <div className="text-lg font-semibold">
        Employee Contract Samle Upload
      </div>
      {!file && (
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={file ? [file] : []}
              onChange={(val: File[]) => {
                setFile(val[0]);
              }}
              className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
            />
          </div>
        </div>
      )}
      {file && (
        <div className="w-full rounded-xl border-1 border-default-200 my-1 bg-content1 backdrop-grayscale flex justify-between items-start">
          <div className="flex gap-3 flex-row items-start p-2">
            {file.type.startsWith("image/") ? (
              <Image
                src={(file as any).preview}
                width={50}
                height={50}
                classNames={{ img: "object-cover" }}
              />
            ) : (
              <Icon
                icon="fluent-color:document-16"
                className="h-fit w-fit min-w-[50px]"
              />
            )}
            <p className="text-sm pt-2">{file.name}</p>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => setFile(null)}
            >
              <Icon icon="mynaui:trash" fontSize={20}></Icon>
            </Button>
          </div>
        </div>
      )}

      {file && (
        <div className="w-full flex justify-end">
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              if (file) {
                // Handle file upload
              }
            }}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
export default EmployeeContractUpload;
