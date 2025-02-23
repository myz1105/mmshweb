"use client";
import { Button, Form, Spinner } from "@heroui/react";
import React from "react";
import { EnterPhoneHeader } from "@/components/identityComps/enter-phone";
import EnterPhone from "@/components/identityComps/enter-phone";
import { PhoneNumberUtil } from "google-libphonenumber";
import { CountryData } from "react-international-phone";
import { useState, useEffect } from "react";
import { AuthenticationState } from "@/types/authentication";
import { VerifyPhoneHeader } from "@/components/identityComps/verify-phone";
import VerifyPhone from "@/components/identityComps/verify-phone";
import EnterClientInfo from "@/components/identityComps/enter-client-info";
import { addToast } from "@heroui/toast";
import { BaseAddress, setToken, Token, setClient } from "@/types/api";
import { setLocalStorage } from "@/utils/localstorage";
import { Sura } from "next/font/google";
type ClientParameters = {
  phoneNumber: string;
  verificationCode: number;
  deviceModel?: string;
  clientId?: string;
};

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
    AuthenticationState.EnterClientInfoState
  );
  const [loading, setLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const [clientInfo, setClientInfo] = useState<
    { firstname: string; surname: string } | undefined
  >();
  const [clientImageSrc, setClientImageSrc] = useState<string | undefined>();

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
    }
  };

  const handleVerify = (code: string) => {
    if (code.length === 5) {
      setCanSubmit(true);
      setVerifyCode(code);
    }
  };
  const handlePhoneEdit = () => {
    setState(AuthenticationState.EnterPhoneNumber);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (state === AuthenticationState.EnterPhoneNumber) {
      if (phone && phone.phone) {
      }
      try {
        const res = await fetch(BaseAddress + "Account/Init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phone?.formattedPhone.replace(/[^0-9]/g, ""),
            deviceModel: navigator.userAgent,
          }),
        });

        if (!res.ok) {
          addToast({
            title: "Error",
            description: "Error occured while request.",
            color: "danger",
          });
        }

        const result = await res.json();
        const { Message, Status } = result;
        console.log(result);
        if (Status === 202) {
          setState(AuthenticationState.VerificationState);
          setCanSubmit(false);
        } else {
          addToast({
            description: Message,
            color: "warning",
          });
        }
        setLoading(false);
      } catch (error) {
        addToast({
          title: "Error",
          description: "Error occured",
          color: "danger",
        });
        console.error("Error:", error);
        setLoading(false);
      }
    }
    if (state === AuthenticationState.VerificationState) {
      setLoading(true);
      if (verifyCode.length === 5) {
        try {
          const res = await fetch(BaseAddress + "Account/Init", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: phone?.formattedPhone.replace(/[^0-9]/g, ""),
              deviceModel: navigator.userAgent,
              verificationCode: parseInt(verifyCode),
            }),
          });

          if (!res.ok) {
            addToast({
              title: "Error",
              description: "Error occured while request.",
              color: "danger",
            });
          }

          const result = await res.json();
          const { Message, Status, Data } = result;
          if (Status === 100) {
            setLocalStorage("loginConfig", {
              phoneNum: Data.Username,
              clientId: Data.CurrentSession.ClientId,
            });
            setToken(Data.CurrentSession.Token);
            if (Data.Info) {
            } else {
              setState(AuthenticationState.EnterClientInfoState);
              setCanSubmit(false);
            }
          } else {
            addToast({
              description: Message,
              color: "warning",
            });
          }
          setLoading(false);
        } catch (error) {
          addToast({
            title: "Error",
            description: "Error occured on verification",
            color: "danger",
          });
          setLoading(false);
        }
      }
    }
    if (state === AuthenticationState.EnterClientInfoState) {
      try {
        const result = await handleUploadImage();
        const res = await fetch(BaseAddress + "Client/Create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
          body: JSON.stringify({
            name: clientInfo?.firstname,
            surname: clientInfo?.surname,
            img: result.data,
          }),
        });

        if (!res.ok) {
          addToast({
            title: "Error",
            description: "Error occured while request.",
            color: "danger",
          });
        }

        const result1 = await res.json();
        const { Message, Status, Data } = result1;
        if (Status === 100) {
          setClient(Data);
          setState(AuthenticationState.AuthReady);
        } else {
          addToast({
            description: Message,
            color: "warning",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Upload failed:", error);
      }
      setLoading(false);
    }
    if (state === AuthenticationState.AuthReady) {
    }
  };

  const handleClientInfo = (
    isvalid: boolean,
    clientdata: { firstname: string; surname: string }
  ) => {
    setCanSubmit(isvalid);
    setClientInfo(clientdata);
  };
  const handleClientImageSrc = (src: string) => {
    setClientImageSrc(src);
  };

  const handleUploadImage = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!clientImageSrc) {
        reject(new Error("No image source provided"));
        return;
      }

      const base64Image = clientImageSrc; // Get the base64 image
      // Check if the base64 string contains a data URL prefix
      const [header, base64WithoutPrefix] = base64Image.split(",");
      if (!base64WithoutPrefix) {
        reject(new Error("Invalid base64 image format"));
        return;
      }

      try {
        // Decode the base64 string
        const byteCharacters = atob(base64WithoutPrefix);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Determine the MIME type and file extension from the header
        const mimeTypeMatch = header.match(/data:(.*?);base64/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/png"; // Default to PNG if not found
        const fileExtension = mimeType.split("/")[1]; // Get the file extension (e.g., 'jpeg', 'png', etc.)

        // Create a Blob and File object
        const blob = new Blob([byteArray], { type: mimeType });
        const file = new File([blob], `avatar.${fileExtension}`, {
          type: mimeType,
        }); // Use the correct extension

        const formData = new FormData();
        formData.append("formFile", file); // Append the file to FormData
        // Upload to your API
        const apiUrl = BaseAddress + "Img/Upload"; // Replace with your API URL
        const uploadResponse = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.statusText}`);
        }

        const result = await uploadResponse.json();
        resolve(result); // Resolve the promise with the result
      } catch (error) {
        reject(error); // Reject the promise with the error
      }
    });
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
            <EnterClientInfo
              onImageUpdated={handleClientImageSrc}
              onUpdate={handleClientInfo}
            />
          )}
          <Button
            className="w-full"
            isDisabled={!canSubmit || loading}
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
