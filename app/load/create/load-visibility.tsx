import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Select,
  SelectItem,
  Avatar,
  Chip,
  ScrollShadow,
  Listbox,
  Selection,
  ListboxItem,
  Tabs,
  Tab,
  Card,
  CardBody,
  AvatarGroup,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Groups, users } from "../utils/fakeLoadData";
import { LoadStatus } from "../utils/types";
const LoadVisibilityAndStatus: React.FC = () => {
  const [selected, setSelected] = React.useState("users");

  const [selectedStatus, setSelectedStatus] = useState<LoadStatus>();

  const handleSelectionChange = (key: string) => {
    setSelectedStatus(key as LoadStatus);
  };

  useEffect(() => {
    handleSelectionChange("Active");
  }, []);

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Visibility, Status</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        Load information is visible:
      </div>

      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(value) => {
          setSelected(value.toString());
        }}
      >
        <Tab key="users" title="For selected users">
          <UserList />
        </Tab>
        <Tab key="groups" title="For selected groups">
          <GroupList />
        </Tab>
        <Tab key="everyone" title="For everyone">
          <div className=" p-4 rounded-sm">
            Load is visible for <span className="font-bold">everyone</span>
          </div>
        </Tab>
        <Tab key="me" title="For only me">
          <div className=" p-4 rounded-sm">
            Load is visible for <span className="font-bold">only me</span>
          </div>
        </Tab>
      </Tabs>
      <Divider className="my-5  " />
      <div className="text-xl text-default-600 dark:text-default-400">
        Load status
      </div>
      <div className="flex gap-5 items-center">
        <div className="px-2 mb-[6px] text-sm">Select load status</div>
        <ButtonGroup variant="ghost">
          <Button className="w-[200] flex justify-start">
            {selectedStatus}
          </Button>
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
              selectionMode="single"
              selectedKeys={new Set([selectedStatus])}
              onSelectionChange={(key) => {
                handleSelectionChange(key.currentKey ? key.currentKey : "");
              }}
            >
              {Object.values(LoadStatus)
                .filter(
                  (value): value is LoadStatus => typeof value === "string",
                ) // Filter to only numeric values
                .map((state) => (
                  <DropdownItem key={state}>{state}</DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      </div>
      <Divider className="my-5 " />
    </div>
  );
};

export default LoadVisibilityAndStatus;

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export function UserList() {
  const [values, setValues] = React.useState<Selection>(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {users.find((user) => `${user.id}` === `${value}`)?.firstname}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-2xl min-w-[500px]",
          list: "max-h-[300px] overflow-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={users}
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={setValues}
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            textValue={item.firstname + " " + item.lastname}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.firstname + " " + item.lastname}
                className="flex-shrink-0"
                size="sm"
                src={item.image}
              />
              <div className="flex flex-col">
                <span className="text-small">
                  {item.firstname + " " + item.lastname}
                </span>
                <span className="text-tiny text-default-400">{item.role}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}

export function GroupList() {
  const [values, setValues] = React.useState<Selection>(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {Groups.find((user) => `${user.id}` === `${value}`)?.name}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-2xl min-w-[500px]",
          list: "max-h-[300px] overflow-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={Groups}
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={setValues}
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.name}>
            <div className="flex gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <span className="text-default-900"> {item.name}</span>
                <Divider />
                <div className="px-1">
                  <AvatarGroup>
                    {item.members.map((m) => (
                      <Avatar size="sm" src={m.image} key={m.id} />
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
