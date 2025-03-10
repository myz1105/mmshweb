"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

import { BaseAddress } from "@/types/api";
import { addToast } from "@heroui/toast";
const ClientContext = createContext<any | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<any | undefined>(undefined);

  useEffect(() => {
    const loginConfig = localStorage.getItem("loginConfig");
    if (loginConfig) {
      const { phoneNum, clientId } = JSON.parse(loginConfig);
      fetchClient(phoneNum, clientId);
    }
  }, []);

  const fetchClient = async (phone: string, clientId: string) => {
    try {
      const res = await fetch(BaseAddress + "Account/Init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phone,
          clientId: clientId,
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
        setClient(Data);
      } else {
        addToast({
          description: Message,
          color: "warning",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
    }
  };

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
