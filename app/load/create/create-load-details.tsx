import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

export const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    key: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    key: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    key: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    key: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    key: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

const CreateLoadDetails: React.FC = () => {
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
          defaultItems={animals}
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
          {(animal) => (
            <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
          )}
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
          defaultItems={animals}
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
          {(animal) => (
            <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
          )}
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
