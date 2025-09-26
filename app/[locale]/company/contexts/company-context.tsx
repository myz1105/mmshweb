"use client";

import { addToast } from "@heroui/toast";
import { BaseAddressAPI } from "@/types/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useClient } from "@/contexts/profile-management/client-context";

const CompanyContext = createContext<any | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [companies, setCompanies] = useState();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BaseAddressAPI}Company/Get`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        addToast({
          description: response.statusText,
          color: "warning",
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      if (data) setCompanies(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setIsLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ companies, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
