"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import CreateCompanyStepper from "./stepper";
import CreateCompanyDetails from "./create-company-details";
import {
  CompanyCreateState,
  useCreateCompany,
} from "../contexts/create-company-context";
import CreateCompanyBanks from "./create-company-bank";
import AddCompanyDocs from "./add-company-docs";
import { useRouter } from "next/navigation";

const CreateCompanyPage: React.FC = () => {
  const router = useRouter();
  const { canGoBack, canGoForward, goBack, goForward, companyCreateState } =
    useCreateCompany();

  const handleBack = () => {
    goBack();
  };
  return (
    <div className="flex h-full ">
      <div className="grow overflow-auto pb-[100px]">
        <div>
          {companyCreateState === CompanyCreateState.EnterCompanyDetails ? (
            <CreateCompanyDetails />
          ) : companyCreateState ===
            CompanyCreateState.EnterCompanyBankDetails ? (
            <CreateCompanyBanks />
          ) : (
            companyCreateState === CompanyCreateState.EnterCompanyDocuments && (
              <AddCompanyDocs />
            )
          )}
          <div className="flex justify-between max-w-3xl gap-6 px-6">
            <Button
              variant="bordered"
              onPress={() => {
                router.replace("/company");
              }}
            >
              <Icon icon="material-symbols:cancel-outline" fontSize={18} />{" "}
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                className={
                  canGoBack === false ? "min-w-[100px] hidden" : "min-w-[100px]"
                }
                variant="bordered"
                onPress={() => {
                  goBack();
                }}
              >
                <Icon icon="material-symbols:arrow-back" fontSize={20} />
                Back
              </Button>
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
            </div>
          </div>
        </div>
      </div>
      <CreateCompanyStepper />
    </div>
  );
};

export default CreateCompanyPage;
