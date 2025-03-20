"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { BaseAddress } from "@/types/api";
import { useClient } from "./client-context";
import { addToast } from "@heroui/toast";

interface SignalRContextProps {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
}

const SignalRContext = createContext<SignalRContextProps | undefined>(
  undefined
);

interface SignalRProviderProps {
  children: React.ReactNode;
}

export const SignalRProvider: React.FC<
  SignalRProviderProps & { hubName: string }
> = ({ children, hubName }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);

  const { token, client } = useClient();

  useEffect(() => {
    if (!client && !token) return;
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${BaseAddress}${hubName}`, {
        accessTokenFactory: () => {
          return `${token}`;
        },
      })

      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        newConnection.on("Offline", (data) => {
          console.log("dasd");
          addToast({
            title: `${data.phoneNumber} is offline!`,
            color: "danger",
          });
        });

        newConnection.on("Online", (data) => {
          addToast({
            title: `${data.phoneNumber} is online!`,
            color: "warning",
          });
        });

        setIsConnected(true);
      })
      .catch((err) => console.error("Error connecting to SignalR hub", err));

    newConnection.onclose(() => {
      console.log("Disconnected from SignalR hub");
      setIsConnected(false);
    });

    return () => {
      newConnection.stop().then(() => console.log("Connection stopped"));
    };
  }, [client, hubName]);

  return (
    <SignalRContext.Provider value={{ connection, isConnected }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (context === undefined) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};
