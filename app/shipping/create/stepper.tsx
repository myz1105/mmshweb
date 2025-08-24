"use client";
import React, { use, useEffect, useState } from "react";
import { Step } from "@/components/main_components/stepper";
import {
  Avatar,
  Badge,
  Chip,
  Divider,
  Progress,
  Spinner,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IoIosPerson } from "react-icons/io";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import { useShipping } from "../contexts/shipping-creation-context";
import { contactIconMap, ShippingCreationState } from "../types";

interface CheckIconProps {
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CreateShippingStepper: React.FC = () => {
  const {
    shippingStep,
    isDriverCardValid,
    isDriverPassportValid,
    isTruckImagesValid,
    isTruckPassportValid,
    isTrailerPassportValid,
    isShippingDetailsValid,
    driverPassportPercentage,
    truckPassportPercentage,
    trailerPassportPercentage,
    driver,
    truck,
    trailer,
    canSave,
    isOnSaving,
  } = useShipping();

  return (
    <div className="hidden overflow-auto lg:flex lg:visible h-full  flex-col py-8 px-6  ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black">
      <h1 className="pt-2 text-xl font-semibold text-center">
        Create new shipping
      </h1>
      <Step
        width={300}
        isChecked={isDriverPassportValid}
        title="Driver Passport"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {driver && driver.name && (
                <div className="flex items-center gap-2">
                  <Icon
                    icon="healthicons:truck-driver"
                    className="flex-none"
                    fontSize={20}
                  />
                  <div className="flex flex-row gap-1">
                    {driver.name && (
                      <span className="font-semibold">{driver.name}</span>
                    )}
                    {driver.surname && (
                      <span className="font-semibold">{driver.surname}</span>
                    )}
                  </div>
                </div>
              )}
              {driver &&
                driver.contacts &&
                driver.contacts.map(
                  (contact: { id: number; type: string; data: string }) =>
                    contact.type &&
                    contact.data && (
                      <Chip
                        variant="flat"
                        radius="sm"
                        size="sm"
                        key={contact.id}
                        color={isDriverPassportValid ? "success" : "default"}
                      >
                        <div className="flex gap-1 items-center">
                          {
                            contactIconMap[
                              contact.type as keyof typeof contactIconMap
                            ]
                          }
                          <span> {contact.data}</span>
                        </div>
                      </Chip>
                    ),
                )}
            </div>
          </div>
        }
        isFocused={shippingStep === ShippingCreationState.PassportOfDriver}
        icon={<Icon icon="fontisto:passport-alt" fontSize={35} />}
        value={driverPassportPercentage}
      />
      <Step
        width={300}
        isChecked={isDriverCardValid}
        title="Driver Card"
        isFocused={shippingStep === ShippingCreationState.DriverCard}
        icon={<Icon icon="fa:drivers-license-o" fontSize={25} />}
        value={isDriverCardValid ? 100 : 0}
      />
      <Step
        width={300}
        isChecked={isTruckPassportValid}
        title="Truck Passport"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {truck && (truck.name || truck.carNumber) && (
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:truck-outline"
                    className="flex-none"
                    fontSize={20}
                  />
                  <div className="flex flex-row gap-1">
                    {truck.name && (
                      <span className="font-semibold">{truck.name}</span>
                    )}
                    {truck.carNumber && (
                      <span className="font-semibold">{truck.carNumber}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        isFocused={shippingStep === ShippingCreationState.TruckPassport}
        icon={<Icon icon="ri:info-card-line" fontSize={35} />}
        value={truckPassportPercentage}
      />
      <Step
        width={300}
        isChecked={isTrailerPassportValid}
        title="Trailer Passport"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {trailer && trailer.carNumber && (
                <div className="flex items-center gap-2">
                  <Icon
                    icon="fa-solid:trailer"
                    className="flex-none"
                    fontSize={20}
                  />
                  {trailer.carNumber && (
                    <span className="font-semibold">{trailer.carNumber}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        }
        isFocused={shippingStep === ShippingCreationState.TrailerPassport}
        icon={<Icon icon="ri:info-card-line" fontSize={35} />}
        value={trailerPassportPercentage}
      />
      <Step
        width={300}
        isChecked={isShippingDetailsValid}
        title="Shipping Details"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {trailer && trailer.carNumber && (
                <div className="flex items-center gap-1">
                  <Icon
                    icon="nimbus:money"
                    className="flex-none"
                    fontSize={18}
                  />
                  {trailer.carNumber && (
                    <span className="font-semibold">{trailer.carNumber}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        }
        isFocused={shippingStep === ShippingCreationState.TrailerPassport}
        icon={<Icon icon="ix:details" fontSize={35} />}
        value={trailerPassportPercentage}
      />
      <Step
        width={300}
        isChecked={isTruckImagesValid}
        title="Truck Images"
        isFocused={shippingStep === ShippingCreationState.TrailerPassport}
        icon={<Icon icon="ion:images-sharp" fontSize={30} />}
        value={100}
      />

      <Button
        color="success"
        className="mt-5 font-bold text-current"
        // isDisabled={canSave === false}
        startContent={isOnSaving && <Spinner />}
        isDisabled={!canSave}
        onPress={() => {}}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateShippingStepper;
