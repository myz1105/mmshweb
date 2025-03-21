import {
  Divider,
  Listbox,
  ListboxItem,
  Selection,
  RadioGroup,
  Radio,
  Checkbox,
  Input,
  CheckboxGroup,
} from "@heroui/react";
import TreeView, { TreeNode } from "@/components/main_components/tree-view";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

export enum LoadReadyState {
  LoadIsReadyAt,
  Always,
  NotReadyYet,
}
export enum Workdays {
  onlyWorkDays,
  Everyday,
}

const sampleData: TreeNode[] = [
  {
    id: 1,
    name: "Node 1",
    children: [
      {
        id: 2,
        name: "Node 1.1",
        children: [
          { id: 3, name: "Node 1.1.1" },
          { id: 4, name: "Node 1.1.2" },
        ],
      },
      { id: 5, name: "Node 1.2" },
    ],
  },
  {
    id: 6,
    name: "Node 2",
    children: [
      { id: 7, name: "Node 2.1" },
      { id: 8, name: "Node 2.2" },
    ],
  },
];

const CreateTrailer: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["text"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Trailer</div>
      <div className="flex items-stretch justify-stretch gap-3 flex-wrap w-full">
        <div className="grow self-stretch flex flex-col gap-1">
          <div className="text-sm text-default-600 dark:text-default-500">
            Trailer
          </div>
          <TreeView
            nodes={sampleData}
            isExtended={true}
            selectionMode="multi"
          />
        </div>
        <div className="grow self-stretch flex flex-col gap-1">
          <div className="text-sm text-default-600 dark:text-default-500">
            Loading
          </div>
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Multiple selection example"
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={setSelectedKeys}
            >
              <ListboxItem key="text">Text</ListboxItem>
              <ListboxItem key="number">Number</ListboxItem>
              <ListboxItem key="date">Date</ListboxItem>
              <ListboxItem key="single_date">Single Date</ListboxItem>
              <ListboxItem key="iteration">Iteration</ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className="grow self-stretch flex flex-col gap-1">
          <div className="text-sm text-default-600 dark:text-default-500">
            Unloading
          </div>
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Multiple selection example"
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={setSelectedKeys}
            >
              <ListboxItem key="text">Text</ListboxItem>
              <ListboxItem key="number">Number</ListboxItem>
              <ListboxItem key="date">Date</ListboxItem>
              <ListboxItem key="single_date">Single Date</ListboxItem>
              <ListboxItem key="iteration">Iteration</ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>

      <div className="flex gap-4 items-start flex-wrap mt-3">
        <div className="flex flex-col gap-1 me-2">
          <Input
            variant="faded"
            description="How many do you need the cars"
            endContent={
              <span className="text-default-600 dark:text-default-400">#</span>
            }
            label="Number of cars"
            labelPlacement="outside"
            placeholder="1"
            type="number"
          />
          <Input
            variant="faded"
            description="Enter ADR class"
            endContent={
              <span className="text-default-600 dark:text-default-400">
                class
              </span>
            }
            label="ADR"
            labelPlacement="outside"
            placeholder="1-9"
            type="number"
          />
        </div>
        <div className="flex flex-col gap-3">
          <RadioGroup
            color="default"
            label="Loading"
            defaultValue="buenos-aires"
          >
            <Radio description="FTL" value="buenos-aires">
              Separate machine
            </Radio>
            <Radio description="FTL or LTL" value="canberra">
              By separate vehicle or additional load
            </Radio>
          </RadioGroup>
          <Checkbox>2 drivers required</Checkbox>
        </div>
      </div>
      <div>
        <CheckboxGroup
          color="default"
          defaultValue={["buenos-aires", "san-francisco"]}
          label="Permissions"
          orientation="horizontal"
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
      </div>
      <div>
        <CheckboxGroup
          color="default"
          defaultValue={["buenos-aires", "san-francisco"]}
          label="Requirements"
          orientation="horizontal"
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-1 me-2">
        <Input
          variant="faded"
          description="How many do you belts"
          endContent={
            <span className="text-default-600 dark:text-default-400">#</span>
          }
          label="Belts"
          labelPlacement="outside"
          placeholder="1"
          type="number"
        />
      </div>

      <Divider className="my-5" />
    </div>
  );
};

export default CreateTrailer;

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="grow border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
