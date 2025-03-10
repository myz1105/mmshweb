import { useState } from "react";
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Switch } from "@heroui/react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@heroui/react";

export const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [translucentUI, setTranslucentUI] = useState(false);
  const [selectedSize, setSelectedSize] =
    useState<keyof typeof sizeLabels>("medium"); // Fixed typing
  const [selectedOption, setSelectedOption] = useState<Selection>(
    new Set(["eng"])
  ); // Correct

  const labelsMap = {
    uz: "Uzbek",
    eng: "English",
    ru: "Russian",
  } as const;

  const sizeLabels = {
    large: "Large",
    medium: "Medium",
    small: "Small",
  } as const;

  const selectedOptionValue = Array.from(
    selectedOption
  )[0] as keyof typeof labelsMap; // Ensure correct type

  return (
    <div className="p-6 rounded-xl w-120">
      <h2 className="text-lg font-semibold">Theme</h2>
      <p className="text-sm text-gray-400">Change the appearance of the web.</p>

      <div className="mt-4 flex gap-4">
        <div
          className={`border p-4 rounded-lg cursor-pointer w-1/2 flex flex-col items-center ${
            !darkMode ? "border-blue-500" : "border-gray-700"
          }`}
          onClick={() => setDarkMode(false)}
        >
          <FaSun className="h-6 w-6 text-gray-500" />
          <p className="text-sm mt-2">Light</p>
        </div>

        <div
          className={`border p-4 rounded-lg cursor-pointer w-1/2 flex flex-col items-center ${
            darkMode ? "border-blue-500" : "border-gray-700"
          }`}
          onClick={() => setDarkMode(true)}
        >
          <FaMoon className="h-6 w-6 text-gray-500" />
          <p className="text-sm mt-2">Dark</p>
        </div>
      </div>

      <div className="mt-6 flex flex-row items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Font size</h3>
          <p className="text-sm text-gray-400">Adjust the web font size.</p>
        </div>

        <div className="ml-auto relative">
          <ButtonGroup variant="flat" className="w-full">
            <Button className="w-full p-1">{sizeLabels[selectedSize]}</Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Size options"
                className="max-w-[300px]"
                selectedKeys={new Set([selectedSize])}
                selectionMode="single"
                onSelectionChange={(keys) =>
                  setSelectedSize(
                    Array.from(keys)[0] as keyof typeof sizeLabels
                  )
                }
              >
                {Object.keys(sizeLabels).map((key) => (
                  <DropdownItem key={key}>
                    {sizeLabels[key as keyof typeof sizeLabels]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Close Sidebar on Default</h3>
          <p className="text-sm text-gray-400">
            Use this function when you need to close Sidebar on Default
          </p>
        </div>
        <Switch
          checked={translucentUI}
          onValueChange={setTranslucentUI}
          style={{ marginLeft: "10px" }}
          className={`${
            translucentUI ? "bg-blue-500" : "bg-gray-700"
          } inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              translucentUI ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Choose language</h3>
        </div>
        <ButtonGroup variant="flat">
          <Button>{labelsMap[selectedOptionValue]}</Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Language options"
              className="max-w-[300px]"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={setSelectedOption}
            >
              {Object.keys(labelsMap).map((key) => (
                <DropdownItem key={key}>
                  {labelsMap[key as keyof typeof labelsMap]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      </div>
    </div>
  );
}
