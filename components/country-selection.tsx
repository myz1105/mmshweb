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
export default function CountrySelection() {
  const [selectedKey, setSelectedKey] = useState("uz");
  const [country, setCountry] = useState<CountryData>();

  useEffect(() => {
    if (selectedKey) {
      var c = defaultCountries.find((x) => x[1] == selectedKey);
      if (c) setCountry(c);
    }
  }, [selectedKey]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {country ? country[0] : "Select country"}
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
      >
        {defaultCountries.map((c) => {
          const country = parseCountry(c);
          return (
            <DropdownItem key={country.iso2}>
              <div className="flex">
                <div className="flex-none">
                  <FlagImage iso2={country.iso2} />
                </div>
                <div className="flex-auto">{country.name}</div>
                <div className="flex-auto">{country.dialCode}</div>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
