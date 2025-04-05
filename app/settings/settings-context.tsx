"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const SettingsContext = createContext<any | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [location, setLocation] = useState("settings");
  const [locItems, setLocitems] = useState<string[]>([]);
  useEffect(() => {
    var locs = location.split("/");
    setLocitems(locs);
  }, [location]);

  return (
    <SettingsContext.Provider value={{ setLocation }}>
      <div className=" flex flex-col  px-6 py-3 max-w-3xl">
        <div className="text-2xl font-semibold mb-1">Settings</div>
        <Breadcrumbs>
          {locItems?.map((loc: string) => {
            return (
              <BreadcrumbItem
                key={loc}
                onPress={() => {
                  let currentLoc = "/";
                  for (let i = 0; i < locItems.length; i++) {
                    const element = locItems[i];
                    currentLoc += `${element}/`;
                    if (element === loc) {
                      break;
                    }
                  }
                  router.push(currentLoc);
                }}
              >
                {<div className="capitalize">{loc}</div>}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>

        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};
