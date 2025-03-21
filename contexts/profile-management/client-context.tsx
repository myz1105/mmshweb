"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

import { BaseAddress, BaseAddressAPI } from "@/types/api";
import { addToast } from "@heroui/toast";
import { get } from "http";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const ClientContext = createContext<any | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [myContacts, setMyContacts] = useState([]);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const [token, setToken] = useState("");

  const getImg = (img?: string): string | undefined => {
    if (client && client.Info && client.Info.Img) {
      const baseImgUrl = `${BaseAddressAPI}Img/Download/${client.Info.Img.Name}`;
      return img ? `${baseImgUrl}?directory=${img}` : baseImgUrl;
    }
    return undefined; // Return undefined if client.Img is not available
  };
  const getImage = (img?: string, size?: string): string | undefined => {
    if (client && client.Info && client.Info.Img) {
      const baseImgUrl = `${BaseAddressAPI}Img/Download/${img}`;
      return size ? `${baseImgUrl}?directory=${size}` : baseImgUrl;
    }
    return undefined; // Return undefined if client.Img is not available
  };
  useEffect(() => {
    const loginConfig = localStorage.getItem("loginConfig");
    if (loginConfig) {
      const { phoneNum, clientId } = JSON.parse(loginConfig);
      fetchClient(phoneNum, clientId);
    }
  }, []);

  const fetchClient = async (phone: string, clientId: string) => {
    console.log(phone, clientId);
    setIsLoading(true);
    try {
      const res = await fetch(BaseAddressAPI + "Account/Init", {
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
      console.log(result);
      const { Message, Status, Data } = result;
      if (Status === 100) {
        setClient(Data);
        setToken(Data.CurrentSession.Token);
      } else {
        addToast({
          description: Message,
          color: "warning",
        });
      }
      setIsLoading(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
      setIsLoading(false);
    }
  };

  const initListeners = (clnt: any) => {
    console.log(clnt);
    const connect = new HubConnectionBuilder()
      .withUrl(BaseAddress + "UpdatesHub", {
        accessTokenFactory: () => {
          return `${clnt.CurrentSession.Token}`;
        },
      })

      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);

    connect
      .start()
      .then(() => {
        connect.on("Online", (data) => {
          addToast({
            title: `${data.phoneNumber} is online!`,
            color: "warning",
          });
        });
      })
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err),
      );

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  };

  return (
    <ClientContext.Provider
      value={{ client, setClient, getImg, token, getImage }}
    >
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
