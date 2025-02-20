"use client";
import { Input } from "@heroui/react";
import { CountryData } from "react-international-phone";
import { MMSHLogo } from "@/components/icons";
import CountrySelection from "@/components/country-selection";
import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  DialCodePreview,
  getActiveFormattingMask,
  parseCountry,
} from "react-international-phone";

interface PhoneNumberProps {
  onUpdate: (phoneData: {
    phone: string;
    country: CountryData;
    formattedPhone: string;
  }) => void; // Callback function type
}

export default function EnterPhone({ onUpdate }: PhoneNumberProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [placeholder, setPlaceHolder] = useState<string>("");
  const [formattedPhone, setFormattedPhone] = useState<string>("");
  const [mask, setMask] = useState<string>("");

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    var parsedCountry = parseCountry(country);
    var m = getActiveFormattingMask({
      phone: "330008866",
      country: parsedCountry,
    });
    setMask(m);
    setPlaceHolder(mask.replace(/\./g, "-"));
  };

  useEffect(() => {
    setFormattedPhone("");
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [selectedCountry]);

  function formatStringWithMask(input: string, mask: string): string {
    let inputIndex = 0; // Index to track the position in the input string
    let formattedString = ""; // Resulting formatted string
    input = input.replace(/[^0-9]/g, "");

    for (var i = 0; i < input.length; ) {
      if (mask.length <= inputIndex) {
        break;
      }
      if (mask[inputIndex] === ".") {
        formattedString += input[i];
        inputIndex++;
        i++;
      } else {
        formattedString += mask[inputIndex];
        inputIndex++;
      }
    }
    if (selectedCountry) {
      var updatedPhone = formattedString.replace(/[^0-9]/g, "");
      var formPhone = "+" + selectedCountry[2] + " " + formattedString;
      onUpdate({
        phone: updatedPhone,
        country: selectedCountry,
        formattedPhone: formPhone,
      });
    }
    return formattedString;
  }

  return (
    <>
      <CountrySelection onSelect={handleCountrySelect} />
      <Input
        isClearable
        isRequired
        label="Phone number"
        name="phone"
        placeholder={placeholder}
        type="tel"
        variant="bordered"
        startContent={
          <div className="pointer-events-none flex items-center">
            <DialCodePreview
              className="text-400 text-small"
              dialCode={selectedCountry ? selectedCountry[2] : ""}
              prefix="+"
            />
          </div>
        }
        value={formattedPhone}
        onValueChange={(value) => {
          var m = formatStringWithMask(value, mask);
          setFormattedPhone(m);
        }}
        ref={phoneInputRef}
      />
    </>
  );
}

export function EnterPhoneHeader() {
  return (
    <div className="flex flex-col items-center pb-2">
      <MMSHLogo size={250} style={{ marginTop: "-150px" }} />
      <p className="text-xl font-medium">Welcome To MMSH</p>
      <p className="text-small text-default-500 text-center">
        Please confirm your country code and enter your phone number
      </p>
    </div>
  );
}
