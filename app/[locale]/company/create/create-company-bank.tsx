"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Divider,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ButtonGroup,
  Selection,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  useCreateCompany,
  CompanyCreateState,
  BankAccount,
  Bank,
} from "../contexts/create-company-context";

const CreateCompanyBanks: React.FC = () => {
  const { setCompanyCreateState, bankAccounts } = useCreateCompany();

  useEffect(() => {
    setCompanyCreateState(CompanyCreateState.EnterCompanyBankDetails);
  }, []);

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Company banks</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        Banks
      </div>
      <div className="w-full">
        {bankAccounts.map((account: Bank) => (
          <BankdAccountInfo
            key={account.id}
            id={account.id}
            Name={account.Name}
            MFO={account.MFO}
            Address={account.Address}
            AccountNumbers={account.AccountNumbers}
          />
        ))}
        <Divider className="my-5 " />
      </div>
    </div>
  );
};
export default CreateCompanyBanks;

const BankdAccountInfo: React.FC<Bank> = ({
  id,
  Name,
  MFO,
  Address,
  AccountNumbers,
}) => {
  const { addBank, updateBank, removeBank, bankAccounts } = useCreateCompany();

  return (
    <Card shadow="none" className="h-fit my-2">
      <CardBody>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Input
              placeholder="Bank name"
              variant="faded"
              className=" grow"
              value={Name}
              onChange={(event) => {
                const val = event.target.value.toUpperCase();
                updateBank({
                  id: id,
                  Name: val,
                  MFO: MFO,
                  Address: Address,
                  AccountNumbers: AccountNumbers,
                });
              }}
            ></Input>
            <Input
              placeholder="MFO"
              variant="faded"
              className="sm:basis-1/3 grow"
              value={MFO}
              onChange={(event) => {
                const val = event.target.value;
                updateBank({
                  id: id,
                  Name: Name,
                  MFO: val,
                  Address: Address,
                  AccountNumbers: AccountNumbers,
                });
              }}
            ></Input>
          </div>

          <Input
            placeholder="Bank address"
            variant="faded"
            className=" grow"
            value={Address}
            onChange={(event) => {
              const val = event.target.value
                .toLowerCase()
                .replace(/(^\w|\s*,\s*\w)/g, (char) => char.toUpperCase());
              updateBank({
                id: id,
                Name: Name,
                MFO: MFO,
                Address: val,
                AccountNumbers: AccountNumbers,
              });
            }}
          ></Input>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 w-full">
            {AccountNumbers.map((account: BankAccount) => (
              <BankAccountField
                id={account.id}
                key={"bank:" + account.id}
                AccountNumber={account.AccountNumber}
                AccountType={account.AccountType}
                bank={{ id, Name, MFO, AccountNumbers, Address }}
              />
            ))}
          </div>
        </div>

        <Divider className="mt-3 mb-1" />
        <div className="flex flex-row justify-end items-end w-full">
          {id === bankAccounts.length && (
            <Button
              isIconOnly
              variant="light"
              className="-mr-2 self-center"
              onPress={() => addBank()}
              size="sm"
            >
              <Icon icon="line-md:plus" fontSize={18} />
            </Button>
          )}
          {id > 1 && (
            <Button
              isIconOnly
              variant="light"
              className="-mr-2 self-center"
              onPress={() => removeBank(id)}
              size="sm"
            >
              <Icon
                icon="line-md:remove"
                className="text-danger"
                fontSize={18}
              />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const BankAccountField: React.FC<BankAccount & { bank: Bank }> = ({
  id,
  AccountNumber,
  AccountType,
  bank,
}) => {
  const { updateBankAccount, addBankAccount, removeBankAccount } =
    useCreateCompany();
  const [selectedOption, setSelectedOption] = React.useState<Selection>(
    new Set(["USD"]),
  );

  const labelsMap = {
    USD: "USD",
    RUBL: "RUBL",
    EURO: "EURO",
    UZS: "UZS",
    YUAN: "YUAN",
  };
  const iconMap = {
    USD: <Icon icon="mdi:currency-usd" fontSize={18} />,
    RUBL: <Icon icon="mdi:currency-rub" fontSize={18} />,
    EURO: <Icon icon="mdi:currency-eur" fontSize={18} />,
    UZS: "UZS",
    YUAN: <Icon icon="mdi:currency-cny" fontSize={18} />,
  };

  const selectedOptionValue = Array.from(
    selectedOption,
  )[0] as keyof typeof labelsMap;

  return (
    <ButtonGroup key={id} variant="flat" className="grow">
      <Input
        color="default"
        radius="none"
        variant="faded"
        placeholder="0000 0000 0000 0000 0000"
        value={AccountNumber}
        onChange={(value) => {
          const formattedValue = value.target.value
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
          updateBankAccount(bank.id, {
            id: id,
            AccountNumber: formattedValue,
            AccountType: AccountType,
          });
        }}
        classNames={{
          inputWrapper: "rounded-l-xl",
        }}
      />
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button variant="faded">
            <div className="flex items-center gap-2">
              {iconMap[selectedOptionValue]}
              <Icon icon="ic:baseline-arrow-drop-down" fontSize={24} />
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          className="max-w-[300px]"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelectedOption(selection);
            updateBankAccount(bank.id, {
              id: id,
              AccountNumber: AccountNumber,
              AccountType:
                labelsMap[Array.from(selection)[0] as keyof typeof labelsMap],
            });
          }}
        >
          <DropdownItem key="USD">
            <div className="flex items-center gap-2">
              {iconMap["USD"]}
              {labelsMap["USD"]}
            </div>
          </DropdownItem>
          <DropdownItem key="RUBL">
            <div className="flex items-center gap-2">
              {iconMap["RUBL"]}
              {labelsMap["RUBL"]}
            </div>
          </DropdownItem>
          <DropdownItem key="EURO">
            <div className="flex items-center gap-2">
              {iconMap["EURO"]}
              {labelsMap["EURO"]}
            </div>
          </DropdownItem>
          <DropdownItem key="UZS">
            <div className="flex items-center gap-2">
              {iconMap["UZS"]}
              <span>{labelsMap["UZS"]}</span>
            </div>
          </DropdownItem>
          <DropdownItem key="YUAN">
            <div className="flex items-center gap-2">
              {iconMap["YUAN"]}
              {labelsMap["YUAN"]}
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {id === Math.max(...bank.AccountNumbers.map((acc) => acc.id)) && (
        <Button
          isIconOnly
          variant="faded"
          onPress={() => {
            addBankAccount(bank.id);
          }}
        >
          <Icon icon="line-md:plus" fontSize={18} />
        </Button>
      )}
      {id < Math.max(...bank.AccountNumbers.map((acc) => acc.id)) && (
        <Button
          isIconOnly
          variant="faded"
          onPress={() => removeBankAccount(bank.id, id)}
        >
          <Icon icon="line-md:minus" className="text-danger" fontSize={18} />
        </Button>
      )}
    </ButtonGroup>
  );
};
