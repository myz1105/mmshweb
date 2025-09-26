"use client";
import React, { createContext, useContext } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

const SettingsContext = createContext<any | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Remove leading/trailing slashes and split
  const locItems = pathname.replace(/^\/|\/$/g, "").split("/");

  // Remove the [locale] segment (assumed to be the first segment)
  const breadcrumbItems = locItems.slice(1);

  // Helper to prettify breadcrumb names
  const prettify = (str: string) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <SettingsContext.Provider value={{}}>
      <div className="flex flex-col px-6 py-3 max-w-3xl">
        <div className="text-2xl font-semibold mb-1">Settings</div>
        <Breadcrumbs>
          {breadcrumbItems.map((loc, idx) => {
            // Build the path up to this breadcrumb, skipping [locale]
            const currentLoc =
              "/" +
              [locItems[0], ...breadcrumbItems.slice(0, idx + 1)].join("/");
            return (
              <BreadcrumbItem
                key={loc + idx}
                onPress={() => router.push(currentLoc)}
              >
                <div className="capitalize">{prettify(loc)}</div>
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
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
