import { Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { rotateImageFile } from "../hr/utils/face-detect-utils";

export interface FileDropzoneProps {
  files: File[] | undefined;
  className: string;
  onChange: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  isImageOverride?: boolean;
  defaultImgSrc?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  files,
  className,
  onChange,
  accept = { "image/*": [] },
  maxFiles = 1,
  isImageOverride = false,
  defaultImgSrc,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rotation, setRotation] = useState(0);

  const handleRotate = async () => {
    if (!files || files.length === 0) return;

    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);

    try {
      const rotatedFile = await rotateImageFile(files[0], 90);
      const rotatedFileWithPreview = Object.assign(rotatedFile, {
        preview: URL.createObjectURL(rotatedFile),
      });
      onChange([rotatedFileWithPreview]);
    } catch (error) {
      console.error("Failed to rotate image:", error);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        // Take up to maxFiles files
        const limitedFiles = acceptedFiles.slice(0, maxFiles);

        // Add preview URLs to each file
        const filesWithPreview = limitedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

        // Replace existing files with new ones
        onChange(filesWithPreview);
      }
    },
    [onChange, maxFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: maxFiles > 1,
    maxFiles,
  });

  const handleRemoveFile = (name: string) => {
    onChange([]);
    if (inputRef.current) {
      inputRef.current.value = ""; // 👈 Reset input so same file can be reselected
    }
  };

  const [isEditBtnsVisible, setEditBtnsVisibility] = useState(false);

  return (
    <>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} ref={inputRef} />
        {isImageOverride && files && files.length > 0 ? (
          <div
            className="relative "
            onMouseEnter={() => {
              setEditBtnsVisibility(true);
            }}
            onMouseLeave={() => {
              setEditBtnsVisibility(false);
            }}
          >
            <Image
              src={(files[0] as any).preview}
              height={280}
              classNames={{ img: "rounded-lg object-cover" }}
            />
            {isEditBtnsVisible && (
              <div className="absolute flex justify-end items-end z-10 w-full h-full top-0  bg-slate-500 rounded-md bg-opacity-30 ">
                <div className="bg-slate-50  rounded-md p-1 mb-1 mr-1 ">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => inputRef.current?.click()}
                    title="Change image"
                  >
                    <Icon icon="mdi:file-replace-outline" fontSize={20} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => {
                      handleRotate();
                    }}
                    title="Rotate"
                  >
                    <Icon icon="ix:rotate" fontSize={20} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleRemoveFile(files[0].name)}
                    title="Remove image"
                  >
                    <Icon icon="mynaui:trash" fontSize={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            {isDragActive ? (
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <div className="text-default-600">Drop here</div>
                <Icon
                  icon="ri:drag-drop-fill"
                  className="text-default-600"
                  fontSize={30}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2 w-full relative">
                {defaultImgSrc && (
                  <img
                    src={defaultImgSrc}
                    className="absolute -z-10 opacity-50 object-fit"
                  />
                )}
                <div className="text-default-600 text-wrap p-2 text-center">
                  Drag & drop {isImageOverride ? "image" : "files"} here, or
                  click to select {isImageOverride ? "an image" : "files"} from
                  your computer
                </div>
                <div className="text-default-600"></div>
                <Button
                  color="default"
                  className="w-fit"
                  onPress={() => inputRef.current?.click()}
                >
                  Select {isImageOverride ? "Image" : "Files"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isImageOverride && (
        <div>
          {files && files.length > 0 && (
            <ul>
              {files.map((file) => (
                <li
                  key={file.name}
                  className="w-full rounded-xl border-1 border-default-200 my-1 bg-content1 backdrop-grayscale"
                >
                  <div className="flex justify-between items-start ">
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
                        onPress={() => handleRemoveFile(file.name)}
                      >
                        <Icon icon="mynaui:trash" fontSize={20}></Icon>
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};
