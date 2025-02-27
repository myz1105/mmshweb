import React from "react";
import {Button, Form, Input} from "@heroui/react";

export default function Account() {
  return (
    <Form className="w-full mt-2">
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
        name="email"
        placeholder="Enter your name and surname"
        type="email"
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
        name="email"
        placeholder="Enter your username"
        type="email"
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
      <Input
          isRequired
          endContent={
            <div className="flex items-center">
              
            </div>
          }
          label="Phone number"
          labelPlacement="outside"
          placeholder="Enter your phone number"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">+</span>
            </div>
          }
          type="string"
        />
      <Button className="bg-gray-800 text-white mt-2 block mx-auto" type="submit">
        Update Account
      </Button>
    </Form>
  );
}

