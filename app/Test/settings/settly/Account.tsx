"use client";
import React from "react";
import { useState } from "react";
import {Button, Form, Input} from "@heroui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Account() {
  const [phone, setPhone] = useState("");

  return (
    <Form className="w-full mt-2 mb-[40vh]">
      <Input
        isRequired
        errorMessage={({validationDetails, validationErrors}) => {
          if (validationDetails.typeMismatch) {
            return "Please enter your name and username";
          }

          return validationErrors;
        }}
        label="Full name"
        labelPlacement="outside"
        name="full name"
        placeholder="Enter your name and surname"
        type="full name"
      />
      <Input
        isRequired
        errorMessage={({validationDetails, validationErrors}) => {
          if (validationDetails.typeMismatch) {
            return "Please enter your username";
          }

          return validationErrors;
        }}
        label="Username"
        labelPlacement="outside"
        name="usernam"
        placeholder="Enter your username"
        type="username"
      />
      <Input
        isRequired
        errorMessage={({validationDetails, validationErrors}) => {
          if (validationDetails.typeMismatch) {
            return "Please enter your email";
          }

          return validationErrors;
        }}
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      
      <div className="w-full">
        <label className="block text-sm font-medium mb-2">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={setPhone}
          containerClass="w-full"
          inputClass="!bg-default-100 !text-default-900 !w-full !h-10 !border !border-default-400 !rounded-lg !pl-20 !pr-4 !shadow-sm hover:!bg-default-200"
          buttonClass="!bg-default-100 !border-r !border-default-400 !rounded-l-lg !px-3 !py-2 hover:!bg-default-200"
          dropdownClass="!bg-default-100 !border !border-default-400 !rounded-lg !shadow-lg"
        />
      </div>
      
      <Button className="bg-gray-700 text-white mt-2 block mx-auto" type="submit">
        Update Account
      </Button>
    </Form>
  );
}

