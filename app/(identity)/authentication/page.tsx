"use client";
import { Button, Form, Spinner } from "@heroui/react";
import React from "react";
import { EnterPhoneHeader } from "@/components/identityComps/enter-phone";
import EnterPhone from "@/components/identityComps/enter-phone";
import { PhoneNumberUtil } from "google-libphonenumber";
import { CountryData } from "react-international-phone";
import { useState } from "react";
import { AuthenticationState } from "@/types/authentication";
import { VerifyPhoneHeader } from "@/components/identityComps/verify-phone";
import VerifyPhone from "@/components/identityComps/verify-phone";
import EnterClientInfo from "@/components/identityComps/enter-client-info";

export default function Authentication() {
  //phone number validation
  const phoneUtil = PhoneNumberUtil.getInstance();
  const [phone, setPhone] = useState<{
    phone: string;
    country: CountryData;
    formattedPhone: string;
  }>();
  const [canSubmit, setCanSubmit] = useState(false);
  const [state, setState] = useState<AuthenticationState>(
    AuthenticationState.EnterPhoneNumber
  );

  const handlePhoneUpdate = (phoneNumber: {
    phone: string;
    country: CountryData;
    formattedPhone: string;
  }) => {
    setPhone(phoneNumber);
    if (phoneNumber) {
      try {
        const number = phoneUtil.parseAndKeepRawInput(
          phoneNumber?.phone,
          phoneNumber?.country[1]
        );
        var checkValidation = phoneUtil.isValidNumberForRegion(
          number,
          phoneNumber?.country[1]
        );
        setCanSubmit(checkValidation);
      } catch (error) {
        setCanSubmit(false);
      }

      console.log(phoneNumber);
    }
  };

  const handleVerify = (code: string) => {
    console.log(code);
    if (code.length === 5) {
      setCanSubmit(true);
    }
  };
  const handlePhoneEdit = () => {
    setState(AuthenticationState.EnterPhoneNumber);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCanSubmit(false);
    if (state == AuthenticationState.EnterPhoneNumber)
      setState(AuthenticationState.VerificationState);
    if (state == AuthenticationState.VerificationState)
      setState(AuthenticationState.EnterClientInfoState);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        {state === AuthenticationState.EnterPhoneNumber && <EnterPhoneHeader />}
        {state === AuthenticationState.VerificationState && (
          <VerifyPhoneHeader
            phoneNumber={phone?.formattedPhone || "+998 33 000 88 66"}
            onEditPressed={handlePhoneEdit}
          />
        )}
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          {state === AuthenticationState.EnterPhoneNumber && (
            <EnterPhone onUpdate={handlePhoneUpdate} />
          )}
          {state === AuthenticationState.VerificationState && (
            <VerifyPhone onUpdate={handleVerify} />
          )}
          {state === AuthenticationState.EnterClientInfoState && (
            <EnterClientInfo />
          )}
          <Button
            className="w-full"
            isDisabled={!canSubmit}
            color="primary"
            type="submit"
          >
            Next
          </Button>

          {/* <Spinner className="w-full" color="default" /> */}
        </Form>
      </div>
    </div>
  );
}
