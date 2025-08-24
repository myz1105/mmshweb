"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosBackspace,
  IoIosPerson,
} from "react-icons/io";
import { HRCreationState } from "../types";
import { useHRCreation } from "../contexts/hr-creation-context";
import CreateEmployeeDetails from "./employee-details";
import { Button } from "@heroui/button";
import HRContract from "./hr-contract";

const CreatePage: React.FC = () => {
  const { hrStep, canGoBack, canGoForward, goBack, goForward } =
    useHRCreation();

  return (
    <div className="flex h-full ">
      <div className="grow overflow-auto pb-[100px]">
        {hrStep === HRCreationState.Details && <CreateEmployeeDetails />}
        {hrStep === HRCreationState.Contract && <HRContract />}

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
                {hrStep === HRCreationState.Contract ? (
                  <div>Save</div>
                ) : (
                  <div>Next</div>
                )}
                {hrStep === HRCreationState.Contract ? (
                  <Icon icon="humbleicons:save" fontSize={20} />
                ) : (
                  <Icon icon="material-symbols:arrow-forward" fontSize={20} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
