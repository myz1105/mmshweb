import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DateRangePicker,
  TimeInput,
  Checkbox,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { today, getLocalTimeZone, Time } from "@internationalized/date";
import { AddressSelectorBox } from "@/components/mini_components/addressselector";
import { LoadReadyState, Workdays } from "../utils/types";

const WorkdayDescriptions: { [key in Workdays]: string } = {
  [Workdays.Everyday]: "Everyday",
  [Workdays.onlyWorkDays]: "Only work days",
};

const LoadReadyStateDescriptions: { [key in LoadReadyState]: string } = {
  [LoadReadyState.LoadIsReadyAt]: "Ready for loading",
  [LoadReadyState.Always]: "Constantly",
  [LoadReadyState.NotReadyYet]: "No load, request a rate",
};

const CreateLoadRoute: React.FC = () => {
  const [loadReadyState, setLoadReadyState] = useState<LoadReadyState>(
    LoadReadyState.LoadIsReadyAt,
  );
  const [workdayState, setWorkdayState] = useState<Workdays>(
    Workdays.onlyWorkDays,
  );

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Load route</div>
      <div className="text-xl text-default-600 dark:text-default-400">When</div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <div>
          <div className="px-2 mb-[6px] text-sm">Load state</div>
          <ButtonGroup variant="faded">
            <Button>{LoadReadyStateDescriptions[loadReadyState]}</Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly className="-m-1">
                  <Icon
                    icon="subway:down-2"
                    className="text-default-600 dark:text-default-400"
                    fontSize={10}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set([loadReadyState])}
                selectionMode="single"
                onSelectionChange={(key) => {
                  const selectedOptionValue = Array.from(key)[0];
                  setLoadReadyState(selectedOptionValue as LoadReadyState);
                }}
              >
                {Object.values(LoadReadyState)
                  .filter(
                    (value): value is LoadReadyState =>
                      typeof value === "number",
                  ) // Filter to only numeric values
                  .map((state) => (
                    <DropdownItem key={state}>
                      {LoadReadyStateDescriptions[state]}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          <div className="text-xs  px-2 py-1 text-default-600 dark:text-default-400">
            Select load state
          </div>
        </div>
        {loadReadyState == LoadReadyState.LoadIsReadyAt && (
          <DateRangePicker
            label="Date interval"
            className="w-[320px]"
            variant="faded"
            visibleMonths={2}
            fullWidth={false}
            description="Select date range"
            labelPlacement="outside"
            minValue={today(getLocalTimeZone())}
          />
        )}

        {loadReadyState == LoadReadyState.Always && (
          <div>
            <div className="px-2 mb-[6px] text-sm">Workday</div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="faded">
                  {WorkdayDescriptions[workdayState]}
                  <Icon
                    icon="subway:down-2"
                    className="text-default-600 dark:text-default-400"
                    fontSize={10}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set([workdayState])}
                selectionMode="single"
                onSelectionChange={(key) => {
                  const selectedOptionValue = Array.from(key)[0];
                  setWorkdayState(selectedOptionValue as Workdays);
                }}
              >
                {Object.values(Workdays)
                  .filter(
                    (value): value is Workdays => typeof value === "number",
                  ) // Filter to only numeric values
                  .map((state) => (
                    <DropdownItem key={state}>
                      {WorkdayDescriptions[state]}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            <div className="text-xs px-2 py-1 text-default-600 dark:text-default-400">
              Select workday
            </div>
          </div>
        )}
      </div>
      <Divider className="my-5" />
      <div className="text-xl text-default-600 dark:text-default-400">
        Loading
      </div>
      <div className="flex items-end justify-start gap-3 flex-wrap w-full">
        <div>
          <AddressSelectorBox onChange={() => {}} />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Input
            className="w-80"
            variant="faded"
            description="Write address of the loading place"
            endContent={
              <Button isIconOnly variant="light" className="-mr-2" size="sm">
                <Icon
                  icon="line-md:map-marker-plus"
                  className="text-default-600 dark:text-default-400"
                  fontSize={20}
                />
              </Button>
            }
            label="Address in the locality"
            labelPlacement="outside"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <TimeInput
          label="From"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(8)}
        />
        <TimeInput
          label="To"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(17)}
        />
        <Checkbox className="self-end">24 hours a day</Checkbox>
      </div>
      <Divider className="my-5" />
      <div className="text-xl text-default-600 dark:text-default-400">
        Unloading
      </div>
      <div className="flex items-end justify-start gap-3 flex-wrap w-full">
        <div>
          <AddressSelectorBox onChange={() => {}} />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Input
            className="w-80"
            variant="faded"
            description="Write address of the loading place"
            endContent={
              <Button isIconOnly variant="light" className="-mr-2" size="sm">
                <Icon
                  icon="line-md:map-marker-plus"
                  className="text-default-600 dark:text-default-400"
                  fontSize={20}
                />
              </Button>
            }
            label="Address in the locality"
            labelPlacement="outside"
            type="text"
            onChange={(event) => {
              const val = event.target.value
                .toLowerCase()
                .replace(/(^\w|\s*,\s*\w)/g, (char) => char.toUpperCase());
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <DateRangePicker
          label="Date range"
          className="w-[320px]"
          variant="faded"
          visibleMonths={2}
          fullWidth={false}
          labelPlacement="outside"
          minValue={today(getLocalTimeZone())}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <TimeInput
          label="From"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(8)}
        />
        <TimeInput
          label="To"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(17)}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Checkbox className="self-end">24 hours a day</Checkbox>
      </div>
      <Divider className="my-5 " />
    </div>
  );
};

export default CreateLoadRoute;
