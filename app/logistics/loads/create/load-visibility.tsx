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
import {
  LoadStatus,
  LoadStatusDescription,
  LoadVisibility,
  LoadVisibilityDescription,
} from "../utils/types";
import { useLoadCreation } from "../contexts/create-load-context";
const LoadVisibilityAndStatus: React.FC = () => {
  const [selected, setSelected] = React.useState("users");

  const [selectedStatus, setSelectedStatus] = useState<LoadStatus>();

  const { loadVisibility, updateLoadVisibility } = useLoadCreation();

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Visibility, Status</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        Load information is visible:
      </div>

      <Tabs
        aria-label="Options"
        selectedKey={
          loadVisibility
            ? LoadVisibilityDescription[
                loadVisibility.visibility as LoadVisibility
              ]
            : undefined
        }
        onSelectionChange={(value) => {
          var val = Object.fromEntries(
            Object.entries(LoadVisibilityDescription).map(([key, value]) => [
              value,
              Number(key) as LoadVisibility,
            ]),
          );
          loadVisibility
            ? updateLoadVisibility({
                ...loadVisibility,
                visibility: val[value],
              })
            : updateLoadVisibility({
                visibility: val[value],
              });
        }}
      >
        {Object.values(LoadVisibility)
          .filter((value): value is LoadVisibility => typeof value === "number") // Filter to only numeric values
          .map((state) => {
            if (state === LoadVisibility.forSelectedUsers) {
              return (
                <Tab
                  key={LoadVisibilityDescription[state]}
                  title="For selected users"
                >
                  <UserList
                    value={
                      loadVisibility && loadVisibility.selectedUsers
                        ? loadVisibility.selectedUsers
                        : undefined
                    }
                    onChange={(val) => {
                      loadVisibility
                        ? updateLoadVisibility({
                            ...loadVisibility,
                            selectedUsers: val,
                          })
                        : updateLoadVisibility({ selectedUsers: val });
                    }}
                  />
                </Tab>
              );
            } else if (state === LoadVisibility.forSelectedGroups) {
              return (
                <Tab
                  key={LoadVisibilityDescription[state]}
                  title="For selected groups"
                >
                  <GroupList
                    value={
                      loadVisibility &&
                      loadVisibility.selectedGroups &&
                      loadVisibility.selectedGroups.length > 0
                        ? loadVisibility.selectedGroups
                        : undefined
                    }
                    onChange={(val) => {
                      loadVisibility
                        ? updateLoadVisibility({
                            ...loadVisibility,
                            selectedGroups: val,
                          })
                        : updateLoadVisibility({ selectedGroups: val });
                    }}
                  />
                </Tab>
              );
            } else if (state === LoadVisibility.forEveryone) {
              return (
                <Tab
                  key={LoadVisibilityDescription[state]}
                  title="For everyone"
                  onSelect={(val) => {
                    console.log(val);
                  }}
                >
                  <div className=" p-4 rounded-sm">
                    Load is visible for{" "}
                    <span className="font-bold">everyone</span>
                  </div>
                </Tab>
              );
            } else {
              return (
                <Tab key={LoadVisibilityDescription[state]} title="For only me">
                  <div className=" p-4 rounded-sm">
                    Load is visible for{" "}
                    <span className="font-bold">only me</span>
                  </div>
                </Tab>
              );
            }
          })}
      </Tabs>
      <Divider className="my-5  " />
      <div className="text-xl text-default-600 dark:text-default-400">
        Load status
      </div>
      <div className="flex gap-5 items-center">
        <div className="px-2 mb-[6px] text-sm">Select load status</div>
        <ButtonGroup variant="ghost">
          <Button className="w-[200] flex justify-start">
            {loadVisibility
              ? LoadStatusDescription[loadVisibility.status as LoadStatus]
              : ""}
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
              selectedKeys={
                loadVisibility && loadVisibility.status
                  ? LoadStatusDescription[loadVisibility.status as LoadStatus]
                  : undefined
              }
              onSelectionChange={(key) => {
                var val = Object.fromEntries(
                  Object.entries(LoadStatusDescription).map(([key, value]) => [
                    value,
                    Number(key) as LoadStatus,
                  ]),
                );
                if (!key.currentKey) return;
                loadVisibility
                  ? updateLoadVisibility({
                      ...loadVisibility,
                      status: val[key.currentKey],
                    })
                  : updateLoadVisibility({
                      status: val[key.currentKey],
                    });
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

export function UserList({
  value,
  onChange,
}: {
  value?: any[];
  onChange: (result?: any) => void;
}) {
  const topContent = React.useMemo(() => {
    if (!value || !value.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {value.map((val) => (
          <Chip key={val.id}>
            {users.find((user) => `${user.id}` === `${val.id}`)?.firstname}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [value?.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-2xl min-w-[500px]",
          list: "max-h-[300px] overflow-scroll",
        }}
        selectedKeys={
          value
            ? (() => {
                if (Array.isArray(value)) {
                  const ids = value.map((e) => String(e.id));
                  return new Set(ids);
                }
                return undefined; // Return undefined if values is not an array
              })()
            : undefined
        }
        items={users}
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={(val) => {
          let groups: any[];
          groups =
            val === "all"
              ? users
              : (() => {
                  let selecteds: number[] = [];
                  if (val instanceof Set) {
                    selecteds = Array.from(val.values().map((e) => Number(e)));
                  }
                  return users.filter((e) => selecteds.includes(e.id));
                })();
          onChange(groups);
        }}
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

export function GroupList({
  value,
  onChange,
}: {
  value?: any[];
  onChange: (result?: any) => void;
}) {
  const topContent = React.useMemo(() => {
    if (!value || !value.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {value.map((val) => (
          <Chip key={val.id}>
            {Groups.find((user) => `${user.id}` === `${val.id}`)?.name}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [value?.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-2xl min-w-[500px]",
          list: "max-h-[300px] overflow-scroll",
        }}
        items={Groups}
        selectedKeys={
          value
            ? (() => {
                if (Array.isArray(value)) {
                  const ids = value.map((e) => String(e.id));
                  return new Set(ids);
                }
                return undefined; // Return undefined if values is not an array
              })()
            : undefined
        }
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={(val) => {
          let groups: any[];
          groups =
            val === "all"
              ? Groups
              : (() => {
                  let selecteds: number[] = [];
                  if (val instanceof Set) {
                    selecteds = Array.from(val.values().map((e) => Number(e)));
                  }
                  return Groups.filter((e) => selecteds.includes(e.id));
                })();
          onChange(groups);
        }}
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
