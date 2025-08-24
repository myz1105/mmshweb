"use client";
import React, { useState } from "react";
import { Step } from "@/components/main_components/stepper";
import { Badge, Chip, Divider, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosBackspace,
  IoIosPerson,
} from "react-icons/io";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import CreateLoadDetails from "./create-load-details";
import CreateLoadRoute from "./create-route";
import CreateTrailer from "./required-trailer";
import ContactInformation from "./contact-information";
import { LoadCreationStatus } from "./constants";
import LoadVisibilityAndStatus from "./load-visibility";
import { useLoadCreation } from "../contexts/create-load-context";
import CreateLoadStepper from "./stepper";

const CreatePage: React.FC = () => {
  const {
    loadCreationState,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    isForwardButtonVisible,
    canSave,
  } = useLoadCreation();

  return (
    <div className="flex h-full ">
      <div className="grow overflow-auto pb-[100px]">
        <div>
          {loadCreationState === LoadCreationStatus.EnterLoadDetails && (
            <CreateLoadDetails />
          )}
          {loadCreationState === LoadCreationStatus.EnterRoute && (
            <CreateLoadRoute />
          )}
          {loadCreationState === LoadCreationStatus.EnterTraileDetails && (
            <CreateTrailer />
          )}
          {loadCreationState === LoadCreationStatus.EnterContactAndPrices && (
            <ContactInformation />
          )}
          {loadCreationState ===
            LoadCreationStatus.SetLoadVisibilityAndStatus && (
            <LoadVisibilityAndStatus />
          )}
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

              {isForwardButtonVisible && (
                <Button
                  className=" min-w-[100px]"
                  variant="solid"
                  color="success"
                  onPress={() => {
                    goForward();
                  }}
                  isDisabled={!canGoForward}
                >
                  Next{" "}
                  <Icon icon="material-symbols:arrow-forward" fontSize={20} />
                </Button>
              )}
              {canSave &&
                loadCreationState ===
                  LoadCreationStatus.SetLoadVisibilityAndStatus && (
                  <Button
                    className=" min-w-[100px]"
                    variant="solid"
                    color="success"
                    onPress={() => {}}
                    isDisabled={!canSave}
                  >
                    Save
                    <Icon icon="material-symbols:arrow-forward" fontSize={20} />
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>

      <CreateLoadStepper />
    </div>
  );
};

export default CreatePage;
