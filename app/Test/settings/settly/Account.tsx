"use client";
import React from "react";
import { useState } from "react";
import { Button, Form, Input } from "@heroui/react";

export default function Account() {
  const [phone, setPhone] = useState("");

  return (
    <Form className="w-full mt-2 mb-[40vh]">
      <Input
        isRequired
        errorMessage={({ validationDetails, validationErrors }) => {
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
        errorMessage={({ validationDetails, validationErrors }) => {
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
        errorMessage={({ validationDetails, validationErrors }) => {
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
        <div className="block text-sm font-medium mb-2">
          Phone Number <span className="text-red-600">*</span>
        </div>
      </div>

      <Button
        className="bg-gray-700 text-white mt-2 block mx-auto"
        type="submit"
      >
        Update Account
      </Button>
    </Form>
  );
  
}
