import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  CountryData,
} from "react-international-phone";
import { IoIosArrowDown } from "react-icons/io";

interface CountrySelectionProps {
  onSelect: (country: CountryData) => void; // Callback function type
}

export default function CountrySelection({ onSelect }: CountrySelectionProps) {
  const [selectedKey, setSelectedKey] = useState("uz");
  const [country, setCountry] = useState<CountryData>();

  useEffect(() => {
    if (selectedKey) {
      const c = defaultCountries.find((x) => x[1] === selectedKey);
      if (c) {
        setCountry(c);
        onSelect(c); // Call the onSelect callback with the selected country
      }
    }
  }, [selectedKey, onSelect]);

  return (
    <Dropdown
      backdrop="blur"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content:
          "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
    >
      <DropdownTrigger>
        <Button
          className="capitalize w-full flex justify-between"
          variant="bordered"
        >
          {country ? country[0] : "Select country"}
          <IoIosArrowDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKey}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(string) =>
          setSelectedKey(string.currentKey ? string.currentKey : "")
        }
        items={defaultCountries}
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        {(item) => (
          <DropdownItem key={item[1]} textValue={item[1]}>
            <div className="flex items-center gap-2">
              <div className="flex-none ">
                <FlagImage iso2={item[1]} size={25} />
              </div>
              <div className="grow">{item[0]}</div>
              <div className="flex-none">+{item[2]}</div>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
