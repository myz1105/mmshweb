"use client";
import {
  Input,
  Avatar,
  User,
  Listbox,
  ListboxItem,
  Selection,
} from "@heroui/react";
import { MMSHLogo } from "@/components/icons";
import React from "react";
import { IoMdHome, IoIosGlobe, IoMdSettings } from "react-icons/io";
import {
  IoChatboxEllipsesSharp,
  IoLogOutSharp,
  IoSettings,
} from "react-icons/io5";
import { GiCargoCrate } from "react-icons/gi";
import { FaTruckPlane } from "react-icons/fa6";
import { MdAccountBalance, MdContactSupport, MdGroup } from "react-icons/md";

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["home"])
  ); // Keep it as a Set

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  // Create a function to handle selection changes
  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys); // Update state with the selected keys
  };

  return (
    <div className=" w-screen max-w-max flex-auto h-[92vh]  text-sm/6 ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
      <div className="p-4 h-full flex flex-col">
        {" "}
        {/* Set flex direction to column */}
        <div className="p-3 flex-none">
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />
        </div>
        <div className="grow">
          {" "}
          {/* This will take up the available space */}
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys} // Pass the Set directly
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys} // Use the new handler
            >
              <ListboxItem
                startContent={
                  <IoMdHome
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                }
                key="home"
              >
                <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                  Home
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
                key="truk-management"
              >
                <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                  Truck management
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
              >
                <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                  Messanger
                </div>
              </ListboxItem>
              <ListboxItem
                startContent={
                  <IoMdSettings
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                }
                key="settings"
              >
                <div className="pt-1 ms-3 font-semibold dark:text-gray-300 text-gray-600">
                  Settings
                </div>
              </ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className="mt-auto">
          {" "}
          {/* This will push the second Listbox to the bottom */}
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedKeys} // Pass the Set directly
              selectionMode="single"
              variant="faded"
              onSelectionChange={setSelectedKeys} // Use the new handler
            >
              <ListboxItem
                startContent={
                  <MdContactSupport
                    size={24}
                    className="dark:text-gray-300 text-gray-600"
                  />
                }
                key="support"
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
              >
                <div className="pt-1 ms-3 dark:text-gray-300 text-gray-600">
                  Log out
                </div>
              </ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        {/* The rest of your sidebar content remains unchanged */}
        {/* ... */}
      </div>
    </div>
  );
}

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="w-full border-small  px-1 py-2 rounded-small border-none">
    {children}
  </div>
);
