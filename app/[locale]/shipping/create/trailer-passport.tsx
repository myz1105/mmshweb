import React, { useCallback, useRef, useState } from "react";
import { Card, CardBody, Chip, Divider, Image, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { FileDropzone } from "../utils";
import { Contact, ContactInformation } from "@/app/company/utils";
import { useShipping } from "../contexts/shipping-creation-context";
import { Passport } from "../types";

const CreateTrailerPassport: React.FC = () => {
  const { trailer, updateTrailer } = useShipping();

  return (
    <div className="max-w-3xl flex flex-col  justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Trailer Information</div>
      <div className="text-xl text-default-600 dark:text-default-400 mb-2">
        Upload Trailer Passport Images
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={
                trailer && trailer.passport && trailer.passport.frontSide
                  ? [trailer.passport.frontSide]
                  : undefined
              }
              onChange={(val: File[]) => {
                let data: Passport | undefined;
                if (trailer && trailer.passport) {
                  data = { ...trailer.passport, frontSide: val[0] };
                } else {
                  data = { frontSide: val[0] };
                }
                if (trailer) {
                  updateTrailer({ ...trailer, passport: data });
                } else {
                  updateTrailer({ passport: data });
                }
              }}
              className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Trailer Passport Front Side</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <div className="w-full ">
            <FileDropzone
              files={
                trailer && trailer.passport && trailer.passport.backSide
                  ? [trailer.passport.backSide]
                  : undefined
              }
              onChange={(val: File[]) => {
                let data: Passport | undefined;
                if (trailer && trailer.passport) {
                  data = { ...trailer.passport, backSide: val[0] };
                } else {
                  data = { backSide: val[0] };
                }
                if (trailer) {
                  updateTrailer({ ...trailer, passport: data });
                } else {
                  updateTrailer({ passport: data });
                }
              }}
              className="border-2 border-dashed border-default min-h-[300px] max-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
              accept={{ "image/*": [] }}
              maxFiles={1}
              isImageOverride={true}
            />
          </div>
          <div className="flex flex-wrap gap-2 font-semibold text-default-700">
            <div>Trailer Passport Back Side</div>
          </div>
        </div>
      </div>
      <Divider className="my-1" />
      <div className="text-xl text-default-600 dark:text-default-400 my-2">
        Trailer Details
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <Input
          label="Trailer number"
          placeholder="ex (10 AA 5555)"
          variant="faded"
          labelPlacement="outside"
          value={trailer ? trailer.carNumber : ""}
          onValueChange={(val) => {
            if (trailer) {
              updateTrailer({ ...trailer, carNumber: val });
            } else {
              updateTrailer({ carNumber: val });
            }
          }}
        />
      </div>

      <Divider className="my-1" />
    </div>
  );
};
export default CreateTrailerPassport;
