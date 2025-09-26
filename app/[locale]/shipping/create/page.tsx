"use client";
import React, { useState } from "react";
import { Step } from "@/components/main_components/stepper";
import { Badge, Button, Chip, Divider, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosBackspace,
  IoIosPerson,
} from "react-icons/io";
import CreateDriverDetails from "./driver-details";
import CreateDriverPassport from "./driver-passport";
import { useShipping } from "../contexts/shipping-creation-context";
import { ShippingCreationState } from "../types";
import CreateTruckPassport from "./truck-passport";
import CreateTrailerPassport from "./trailer-passport";
import CreateShippingDetailes from "./shipping-details";
import UploadTruckImages from "./truck-images";
import CreateShippingStepper from "./stepper";

const CreatePage: React.FC = () => {
  const { shippingStep, canGoBack, canGoForward, goBack, goForward } =
    useShipping();

  return (
    <div className="flex h-full ">
      <div className="grow overflow-auto pb-[100px]">
        {shippingStep === ShippingCreationState.PassportOfDriver && (
          <CreateDriverPassport />
        )}
        {shippingStep === ShippingCreationState.DriverCard && (
          <CreateDriverDetails />
        )}
        {shippingStep === ShippingCreationState.TruckPassport && (
          <CreateTruckPassport />
        )}
        {shippingStep === ShippingCreationState.TrailerPassport && (
          <CreateTrailerPassport />
        )}
        {shippingStep === ShippingCreationState.ShippingDetails && (
          <CreateShippingDetailes />
        )}
        {shippingStep === ShippingCreationState.TruckImages && (
          <UploadTruckImages />
        )}
        <div>
          <div className="flex justify-between max-w-3xl gap-6 px-6">
            <Button variant="bordered">
              <Icon icon="material-symbols:cancel-outline" fontSize={18} />{" "}
              Cancel
            </Button>
            <div className="flex gap-3">
              {canGoBack && (
                <Button
                  className=" min-w-[100px]"
                  variant="bordered"
                  onPress={() => {
                    goBack();
                  }}
                >
                  <Icon icon="material-symbols:arrow-back" fontSize={20} />
                  Back
                </Button>
              )}

              <Button
                className=" min-w-[100px]"
                variant="solid"
                color="success"
                isDisabled={!canGoForward}
                onPress={() => {
                  goForward();
                }}
              >
                {shippingStep === ShippingCreationState.TruckImages ? (
                  <div>Save</div>
                ) : (
                  <div>Next</div>
                )}
                {shippingStep === ShippingCreationState.TruckImages ? (
                  <Icon icon="humbleicons:save" fontSize={20} />
                ) : (
                  <Icon icon="material-symbols:arrow-forward" fontSize={20} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CreateShippingStepper />
    </div>
  );
};

export default CreatePage;
