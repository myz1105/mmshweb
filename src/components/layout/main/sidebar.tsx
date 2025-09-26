"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Avatar,
  User,
  Listbox,
  ListboxItem,
  Selection,
  ListboxSection,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import {
  IoMdHome,
  IoIosGlobe,
  IoMdSettings,
  IoIosArrowDropright,
  IoIosArrowDropleft,
} from "react-icons/io";
import {
  IoChatboxEllipsesSharp,
  IoLogOutSharp,
  IoSettings,
} from "react-icons/io5";
import { GiCargoCrate } from "react-icons/gi";
import { FaTruckPlane } from "react-icons/fa6";
import {
  MdAccountBalance,
  MdContactSupport,
  MdGroup,
  MdAccountCircle,
} from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaBuildingUser } from "react-icons/fa6";
import { getClient } from "@/data/static_data/profile-management";
import { get } from "http";
import { useClient } from "@/contexts/profile-management/client-context";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import ContactsModal from "@/app/[locale]/profile/Contacts/contacts";

interface SidebarProps {
  onUpdate: () => void;
}

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["home"]),
  );

  const [isExtended, setIsExtended] = useState(true);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
  };

  const handleOnUpdateWidth = () => {
    setIsExtended(!isExtended);
  };

  return isExtended ? (
    <SidebarExtended onUpdate={handleOnUpdateWidth} />
  ) : (
    <SidebarShrinked onUpdate={handleOnUpdateWidth} />
  );
}

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-none">
    {children}
  </div>
);

export function SidebarExtended({ onUpdate }: SidebarProps) {
  const router = useRouter();

  const { client, getImg } = useClient();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(
    getImg(client?.Info.Img?.Img64),
  );
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["home"]),
  );

  useEffect(() => {
    setAvatarSrc(getImg(client?.Info.Img?.Img64));
  }, [client]);
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  //Contacts -------------------------------------------
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
  };

  return (
    <div className="w-screen max-w-[300px] flex-auto h-[92vh] text-sm/6 ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black">
      <div className="p-4 h-full flex flex-col relative">
        <div className="pl-3 py-3 flex-none">
          <div className="flex w-full items-center justify-between pt-5">
            <User
              avatarProps={{
                src:
                  avatarSrc ||
                  "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              description={client?.Username}
              name={client?.Info.Name + " " + client?.Info.Surname}
            />
            <Button
              isIconOnly
              variant="light"
              color="default"
              size="sm"
              className=" absolute right-0 top-1 mx-1"
              onPress={() => {
                onUpdate();
              }}
            >
              <IoIosArrowDropleft
                size={20}
                className="default text-gray-500"
              ></IoIosArrowDropleft>
            </Button>
          </div>
        </div>
        <div className="grow">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys}
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys}
            >
              <ListboxSection title="Personal">
                <ListboxItem
                  onPress={() => {
                    router.push("/main");
                  }}
                  startContent={
                    <Icon
                      icon="material-symbols-light:space-dashboard-rounded"
                      className="dark:text-gray-300 text-gray-600"
                      fontSize={28}
                    />
                  }
                  key="main"
                  textValue="Main" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Main
                  </div>
                </ListboxItem>
                <ListboxItem
                  onPress={() => {
                    router.push("/profile");
                  }}
                  startContent={
                    <MdAccountCircle
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="profile"
                  textValue="Profile" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Profile
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <MdGroup
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="teams"
                  textValue="Teams" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Teams
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <RiContactsBook2Fill
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="contacts"
                  textValue="Contacts" // Add textValue prop
                  onPress={() => onOpen()}
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Contacts
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <Icon
                      icon="ix:building1-filled"
                      className="font-semibold dark:text-gray-300 text-gray-600"
                      fontSize={24}
                    />
                  }
                  key="companies"
                  textValue="Companies"
                  onPress={() => {
                    router.push("/company");
                  }}
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Companies
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <IoChatboxEllipsesSharp
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="messanger"
                  textValue="Messenger" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Messenger
                  </div>
                </ListboxItem>
              </ListboxSection>
              <ListboxSection title="Company management">
                <ListboxItem
                  startContent={
                    <MdAccountBalance
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="accounting"
                  textValue=" Accounting" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Accounting
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <FaBuildingUser
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="hr"
                  textValue="Human resource" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Human resource
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <GiCargoCrate
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="logistics"
                  textValue="Load management" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Load management
                  </div>
                </ListboxItem>
                <ListboxItem
                  startContent={
                    <FaTruckPlane
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="truck-management"
                  textValue="Truck management" // Add textValue prop
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Truck management
                  </div>
                </ListboxItem>
              </ListboxSection>
              <ListboxSection title="Application settings">
                <ListboxItem
                  startContent={
                    <IoMdSettings
                      size={24}
                      className="dark:text-gray-300 text-gray-600"
                    />
                  }
                  key="settings"
                  textValue="Settings" // Add textValue prop
                  onPress={() => {
                    router.push("/settings");
                  }}
                >
                  <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                    Settings
                  </div>
                </ListboxItem>
              </ListboxSection>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className="mt-auto">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys}
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys}
            >
              <ListboxItem
                startContent={
                  <MdContactSupport
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                }
                key="support"
                textValue="Support" // Add textValue prop
              >
                <div className="pt-1 ms-3 dark:text-gray-300 text-gray-600">
                  Support
                </div>
              </ListboxItem>
              <ListboxItem
                startContent={
                  <IoLogOutSharp
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                }
                key="logout"
                textValue="Log out" // Add textValue prop
              >
                <div className="pt-1 ms-3 dark:text-gray-300 text-gray-600">
                  Log out
                </div>
              </ListboxItem>
            </Listbox>
          </ListboxWrapper>
          <ContactsModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
      </div>
    </div>
  );
}

export function SidebarShrinked({ onUpdate }: SidebarProps) {
  const { client, getImg } = useClient();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(
    getImg(client?.Info.Img?.Img64),
  );
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["home"]),
  );

  useEffect(() => {
    setAvatarSrc(getImg(client?.Info.Img?.Img64));
  }, [client]);
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
  };

  return (
    <div className=" w-fit max-w-max flex-auto h-[92vh] text-sm/6 ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black">
      <div className="w-full flex justify-center">
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="sm"
          className="mt-1 mx-auto"
          onPress={() => {
            onUpdate();
          }}
        >
          <IoIosArrowDropright
            size={20}
            className="default text-gray-500"
          ></IoIosArrowDropright>
        </Button>
      </div>

      <div className="py-4 px-2 h-full flex flex-col relative">
        <div className=" px-2 flex-none">
          <div className="flex-col w-full items-center">
            <Avatar
              src={
                avatarSrc || "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }
            />
          </div>
        </div>
        <div className="grow">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys}
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys}
              hideSelectedIcon
            >
              <ListboxSection title=" ">
                <ListboxItem
                  key="profile"
                  textValue="Profile" // Add textValue prop
                >
                  <MdAccountCircle
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="teams"
                  textValue="Teams" // Add textValue prop
                >
                  <MdGroup
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="contacts"
                  textValue="Contacts" // Add textValue prop
                >
                  <RiContactsBook2Fill
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="messanger"
                  textValue="Messenger" // Add textValue prop
                >
                  <IoChatboxEllipsesSharp
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
              </ListboxSection>
              <ListboxSection title=" ">
                <ListboxItem
                  key="accounting"
                  textValue=" Accounting" // Add textValue prop
                >
                  <MdAccountBalance
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="hr"
                  textValue="Human resource" // Add textValue prop
                >
                  <FaBuildingUser
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="logistics"
                  textValue="Load management" // Add textValue prop
                >
                  <GiCargoCrate
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
                <ListboxItem
                  key="truck-management"
                  textValue="Truck management" // Add textValue prop
                >
                  <FaTruckPlane
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
              </ListboxSection>
              <ListboxSection title=" ">
                <ListboxItem
                  key="settings"
                  textValue="Settings" // Add textValue prop
                >
                  <IoMdSettings
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                </ListboxItem>
              </ListboxSection>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className="mt-auto">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys}
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys}
              hideSelectedIcon
            >
              <ListboxItem
                key="support"
                textValue="Support" // Add textValue prop
              >
                <MdContactSupport
                  size={24}
                  className="dark:text-gray-300 text-gray-600"
                />
              </ListboxItem>
              <ListboxItem
                key="logout"
                textValue="Log out" // Add textValue prop
              >
                <IoLogOutSharp
                  size={24}
                  className="dark:text-gray-300 text-gray-600"
                />
              </ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>
    </div>
  );
}
