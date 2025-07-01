import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { loadData } from "../utils/fakeLoadData";

const CreateLoadDetails: React.FC = () => {
  const lData = loadData.GoodsAndItems.map((item) => ({ name: item }));
  const pData = loadData.Packages.map((item) => ({ name: item }));
  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Load details</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        General information
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <Autocomplete
          label="Load"
          variant="faded"
          className="max-w-xs"
          defaultItems={lData}
          labelPlacement="outside"
          placeholder="Search a load"
          description="Select load type name"
          selectorIcon={
            <Icon
              icon="ic:baseline-search"
              className="text-default-600 dark:text-default-400"
            />
          }
        >
          {(d) => <AutocompleteItem key={d.name}>{d.name}</AutocompleteItem>}
        </Autocomplete>
        <div className="flex gap-3 flex-wrap">
          <Input
            variant="faded"
            className="max-w-[155px]"
            placeholder="ex: 22T"
            description="Total weight of the load"
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="currency">
                  Currency
                </label>
                <select
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="currency"
                  name="currency"
                >
                  <option>kg</option>
                  <option>T</option>
                </select>
              </div>
            }
            label="Weight"
            labelPlacement="outside"
            type="number"
          />
          <Input
            variant="faded"
            className="max-w-[150px]"
            placeholder="ex: 105"
            description="Total volume of the load"
            endContent={
              <span className="text-default-600 dark:text-default-400">
                m<sup>3</sup>
              </span>
            }
            label="Volume"
            labelPlacement="outside"
            type="number"
          />
        </div>
      </div>
      <Divider className="my-5" />
      <div className="text-xl text-default-600 dark:text-default-400">
        Package information
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <Autocomplete
          label="Package"
          variant="faded"
          className="max-w-xs"
          defaultItems={pData}
          labelPlacement="outside"
          placeholder="Search a package type"
          description="(Optional) Select package type name"
          selectorIcon={
            <Icon
              icon="ic:baseline-search"
              className="text-default-600 dark:text-default-400"
            />
          }
        >
          {(d) => <AutocompleteItem key={d.name}>{d.name}</AutocompleteItem>}
        </Autocomplete>
        <div className="flex gap-3 flex-wrap">
          <Input
            variant="faded"
            className="max-w-[150px]"
            description="(Optional) Total package quantity"
            endContent={
              <span className="text-default-600 dark:text-default-400">#</span>
            }
            label="Quantity"
            labelPlacement="outside"
            type="number"
          />
          <Input
            variant="faded"
            className="max-w-[150px]"
            description="(Optional)"
            endContent={
              <span className="text-default-600 dark:text-default-400">m</span>
            }
            label="Diameter"
            labelPlacement="outside"
            type="number"
          />
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <Input
          variant="faded"
          className="max-w-[155px]"
          description="(Optional)"
          endContent={
            <span className="text-default-600 dark:text-default-400">m</span>
          }
          label="Length"
          labelPlacement="outside"
          type="number"
        />
        <Input
          variant="faded"
          className="max-w-[155px]"
          description="(Optional)"
          endContent={
            <span className="text-default-600 dark:text-default-400">m</span>
          }
          label="Width"
          labelPlacement="outside"
          type="number"
        />
        <Input
          variant="faded"
          className="max-w-[155px]"
          description="(Optional)"
          endContent={
            <span className="text-default-600 dark:text-default-400">m</span>
          }
          label="Height"
          labelPlacement="outside"
          type="number"
        />
      </div>
      <Divider className="my-5 " />
    </div>
  );
};

export default CreateLoadDetails;
