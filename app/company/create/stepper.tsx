"use client";
import React, { use, useEffect, useState } from "react";
import { Step } from "@/components/main_components/stepper";
import { Badge, Chip, Divider, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { IoIosPerson } from "react-icons/io";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import { CompanyCreateState, useCompany } from "../company-context";

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

const iconMap = {
  Phone: <Icon icon="line-md:phone" fontSize={18} />,
  Telegram: <Icon icon="line-md:telegram" fontSize={18} />,
  Whatsapp: <Icon icon="ic:baseline-whatsapp" fontSize={18} />,
  Instagram: <Icon icon="line-md:instagram" fontSize={18} />,
  Web: <Icon icon="ix:application-screen-globe" fontSize={18} />,
  Email: <Icon icon="line-md:email" fontSize={18} />,
  Others: <Icon icon="hugeicons:contact-01" fontSize={18} />,
};

const currencyIconMap = {
  USD: <Icon icon="mdi:currency-usd" fontSize={14} />,
  RUBL: <Icon icon="mdi:currency-rub" fontSize={14} />,
  EURO: <Icon icon="mdi:currency-eur" fontSize={14} />,
  UZS: "UZS",
  YUAN: <Icon icon="mdi:currency-cny" fontSize={14} />,
};

const CreateCompanyStepper: React.FC = () => {
  const {
    company,
    contacts,
    addresses,
    isCompanyDetailsValid,
    companyDetailsCompilationPercentage,
    companyCreateState,
    canSave,
    bankAccounts,
    isBanksValid,
    bankDataCompilationPercentage,
    isCompanyDocumentsValid,
    companyDocsCompilationPercentage,
  } = useCompany();

  return (
    <div className="hidden lg:flex lg:visible h-full  flex-col py-8 px-6  ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black">
      <h1 className="pt-2 text-xl font-semibold text-center">
        Company registration
      </h1>
      <Step
        width={300}
        isChecked={isCompanyDetailsValid}
        title="Company details"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {company.name && (
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={isCompanyDetailsValid ? "success" : "default"}
                >
                  {company.name} {company.type}
                </Chip>
              )}
              {company.inn && (
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={isCompanyDetailsValid ? "success" : "default"}
                >
                  INN: {company.inn}
                </Chip>
              )}
              {company.oked && (
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={isCompanyDetailsValid ? "success" : "default"}
                >
                  Oked: {company.oked}
                </Chip>
              )}

              {contacts.map(
                (contact: { id: number; type: string; data: string }) =>
                  contact.type &&
                  contact.data && (
                    <Chip
                      variant="flat"
                      radius="sm"
                      size="sm"
                      key={contact.id}
                      color={isCompanyDetailsValid ? "success" : "default"}
                    >
                      <div className="flex gap-1 items-center">
                        {iconMap[contact.type as keyof typeof iconMap]}
                        <span> {contact.data}</span>
                      </div>
                    </Chip>
                  )
              )}
              {addresses.map(
                (address: {
                  id: number;
                  sattlement: string;
                  location: string;
                }) =>
                  address.sattlement &&
                  address.location && (
                    <Chip
                      variant="flat"
                      radius="sm"
                      size="sm"
                      key={address.id}
                      color={isCompanyDetailsValid ? "success" : "default"}
                    >
                      <div className="flex gap-1">
                        <Icon icon="carbon:location-company" fontSize={18} />{" "}
                        <span className="max-w-64 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                          {" "}
                          {address.sattlement}, {address.location}
                        </span>
                      </div>
                    </Chip>
                  )
              )}
            </div>
            <div className="flex gap-2 flex-wrap mt-1"></div>
            <div className="flex gap-2 flex-wrap mt-1"></div>
          </div>
        }
        isFocused={
          companyCreateState === CompanyCreateState.EnterCompanyDetails
        }
        icon={<Icon icon="mdi:company" fontSize={35} />}
        value={companyDetailsCompilationPercentage}
      />
      <Step
        width={300}
        isChecked={isBanksValid}
        value={bankDataCompilationPercentage}
        title="Bank details"
        isFocused={
          companyCreateState === CompanyCreateState.EnterCompanyBankDetails
        }
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {bankAccounts[0].Name && (
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={isBanksValid ? "success" : "default"}
                >
                  {bankAccounts[0].Name}
                </Chip>
              )}
              {bankAccounts[0].MFO && (
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={isBanksValid ? "success" : "default"}
                >
                  MFO: {bankAccounts[0].MFO}
                </Chip>
              )}
              {bankAccounts[0].AccountNumbers.map(
                (account: {
                  id: number;
                  AccountNumber: string;
                  AccountType: string;
                }) =>
                  account.AccountNumber &&
                  account.AccountType && (
                    <Chip
                      variant="flat"
                      radius="sm"
                      size="sm"
                      key={account.id}
                      color={isBanksValid ? "success" : "default"}
                    >
                      <div className="flex gap-1 items-center">
                        <span> {account.AccountNumber}</span>
                        {
                          currencyIconMap[
                            account.AccountType as keyof typeof currencyIconMap
                          ]
                        }
                      </div>
                    </Chip>
                  )
              )}
            </div>
          </div>
        }
        icon={<Icon icon="fluent:building-bank-16-filled" fontSize={35} />}
      />
      <Step
        width={300}
        isChecked={isCompanyDocumentsValid}
        value={companyDocsCompilationPercentage}
        title="Domumentation"
        icon={<Icon icon="icon-park-outline:document-folder" fontSize={35} />}
        isFocused={
          companyCreateState === CompanyCreateState.EnterCompanyDocuments
        }
      />
      <Step
        width={300}
        isChecked={true}
        value={50}
        title="Type of services"
        description="Rossiya - Uzbekistan cal;kd;als as;ldj as;ldj alskdkjash dkasjh dkjash dkjas kjdgaskjhdgkasjgd"
        icon={<Icon icon="bi:building-gear" fontSize={35} />}
        isFocused={true}
      />

      <Button
        color="success"
        className="mt-5 font-bold text-current"
        isDisabled={canSave === false}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateCompanyStepper;
