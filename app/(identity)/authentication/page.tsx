"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import {
  PiEyeClosedBold,
  PiEyeBold,
  PiGoogleLogoBold,
  PiGithubLogoBold,
} from "react-icons/pi";

import { MMSHLogo } from "@/components/icons";
import CountrySelection from "@/components/country-selection";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="flex h-full w-full items-top justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-2">
          <MMSHLogo size={250} />
          <p className="text-xl font-medium">Welcome To MMSH</p>
          <p className="text-small text-default-500 text-center">
            Please confirm your country code and enter your phone number
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <CountrySelection />
          <Input
            isRequired
            label="Phone number"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            variant="bordered"
          />
          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}
