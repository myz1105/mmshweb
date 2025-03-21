import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CompanyCreateState, useCompany } from "../company-context";
import { Divider, Image, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";

const CreateCompanyBanks: React.FC = () => {
  const { setCompanyCreateState } = useCompany();

  useEffect(() => {
    setCompanyCreateState(CompanyCreateState.EnterCompanyDocuments);
  }, []);

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Company documents</div>
      <div className="flex flex-wrap gap-2 font-semibold text-default-700">
        <Chip color="danger" variant="dot">
          <div className="flex gap-1 items-center p-1">
            <div>Company Certificate</div>
          </div>
        </Chip>

        <Chip color="warning" variant="dot">
          <div className="flex gap-1 items-center p-1">
            <div>Company Passport</div>
          </div>
        </Chip>
        <Chip color="danger" variant="dot">
          <div className="flex gap-1 items-center p-1">
            <div>Owner Identification</div>
          </div>
        </Chip>
        <Chip color="danger" variant="dot">
          <div className="flex gap-1 items-center p-1">
            <div>Ownership Document</div>
          </div>
        </Chip>
      </div>
      <div className="w-full ">
        <FileDropzone className="border-2 border-dashed border-default min-h-[300px] flex items-center justify-center rounded-xl bg-content1 backdrop-grayscale" />
      </div>

      <div className="flex w-full  text-warning items-center p-2 gap-2 bg-warning-100 mt-1 rounded-xl backdrop-blur">
        <Icon icon="fluent-mdl2:important" fontSize={20} />
        <div className="text-sm  leading-relaxed">
          Please upload a minimum of three documents to proceed.
        </div>
      </div>
      <Divider className="my-1" />
    </div>
  );
};
export default CreateCompanyBanks;

const FileDropzone: React.FC<any> = ({ className }: { className: string }) => {
  const { files, setFiles, removeFile } = useCompany();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles?.length) {
      setFiles((prevFiles: File[]) => {
        const existingFileNames = new Set(prevFiles.map((file) => file.name));
        const newFiles = acceptedFiles
          .filter((file) => !existingFileNames.has(file.name))
          .map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          );
        return [...prevFiles, ...newFiles];
      });
    }
  }, []);
  const handleRemoveFile = (name: string) => {
    removeFile(name); // Correct: updating state in response to an event
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-default-600">Drop here</div>
            <Icon
              icon="ri:drag-drop-fill"
              className="text-default-600"
              fontSize={30}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-default-600">
              Drag & drop files here, or click to select files
            </div>
            <Button
              color="default"
              className="w-fit"
              onPress={() =>
                (
                  document.querySelector(
                    'input[type="file"]',
                  ) as HTMLInputElement
                )?.click()
              }
            >
              Select files
            </Button>
          </div>
        )}
      </div>
      <div>
        <ul>
          {files.map((file: File & { preview: string }) => (
            <li
              key={file.name}
              className="w-full rounded-xl border-1 border-default-200 my-1 bg-content1 backdrop-grayscale"
            >
              <div className="flex justify-between items-start ">
                <div className="flex gap-3 flex-row items-start p-2">
                  {file.type === "application/pdf" ? (
                    <Icon
                      icon="vscode-icons:file-type-pdf2"
                      className="h-fit w-fit min-w-[50px]"
                    ></Icon>
                  ) : file.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    file.type === "application/msword" ? (
                    <Icon
                      icon="vscode-icons:file-type-word"
                      className="h-fit w-fit min-w-[50px]"
                    ></Icon>
                  ) : file.type ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    file.type === "application/vnd.ms-excel" ? (
                    <Icon
                      icon="vscode-icons:file-type-excel"
                      className="h-fit w-fit min-w-[50px]"
                    ></Icon>
                  ) : file.type.startsWith("image/") ? (
                    <Image
                      src={file.preview}
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
                  {/* <Button isIconOnly size="sm" variant="light">
                    {" "}
                    <Icon icon="mingcute:more-2-line" fontSize={20}></Icon>
                  </Button> */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleRemoveFile(file.name)}
                  >
                    {" "}
                    <Icon icon="mynaui:trash" fontSize={20}></Icon>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
