"use client";

import { addToast } from "@heroui/toast";
import { BaseAddressAPI } from "@/types/api";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { useClient } from "@/contexts/profile-management/client-context";
import { Company, CompanyContracts, CompanyContractSamples } from "../types";

const CompanyContext = createContext<any | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const [isContractsLoading, setIsContractsLoading] = useState(false);
  const [isContractSampleLoading, setIsContractSampleLoading] = useState(false);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>();
  const [companyContracts, setCompanyContracts] = useState<
    CompanyContracts | undefined
  >();

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    console.log("Current Company Contracts:", companyContracts);
  }, [companyContracts]);

  const fetchCurrentCompany = async (id: string) => {
    setIsCurrentLoading(true);
    try {
      const response = await fetch(`${BaseAddressAPI}Company/Get/${id}`, {
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
        setIsCurrentLoading(false);
        return;
      }

      const data = await response.json();
      if (data) setCurrentCompany(data);

      setIsCurrentLoading(false);
    } catch (error) {
      console.error("Error fetching current company:", error);
      setIsCurrentLoading(false);
    }
  };

  const postContractSample = async (
    id: string,
    file: File,
    contractType: CompanyContractSamples,
  ) => {
    setIsContractSampleLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${BaseAddressAPI}Company/UploadContract/${id}?contractType=${contractType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data', // Let the browser set it
          },
          body: formData,
        },
      );
      if (!response.ok) {
        addToast({
          description: response.statusText,
          color: "warning",
        });
        setIsContractSampleLoading(false);
        return;
      }

      const { Document, Message } = await response.json();
      if (Document) {
        setCompanyContracts((prev: CompanyContracts | undefined) => {
          if (!prev) return prev;
          if (contractType == CompanyContractSamples.HRContract) {
            return {
              ...prev,
              HRContract: Document,
            };
          }
          if (contractType == CompanyContractSamples.PartnershipContract) {
            return {
              ...prev,
              PartnershipContract: Document,
            };
          }
        });
      }
      if (Message) {
        addToast({
          description: Message,
          color: "success",
        });
      }
      setIsContractSampleLoading(false);
    } catch (error) {
      console.error("Error fetching current company:", error);
      setIsContractSampleLoading(false);
    }
  };

  const fetchCompanyContract = async (id: string) => {
    setIsContractsLoading(true);
    try {
      const response = await fetch(`${BaseAddressAPI}Company/Contracts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      });

      if (!response.ok) {
        addToast({
          description: response.statusText,
          color: "warning",
        });
        setIsContractsLoading(false);
        return;
      }

      const data = await response.json();
      if (data) setCompanyContracts(data);

      setIsContractsLoading(false);
    } catch (error) {
      console.error("Error fetching current company contracts:", error);
      setIsContractsLoading(false);
    }
  };
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
    <CompanyContext.Provider
      value={{
        companies,
        isLoading,
        fetchCompanies,
        currentCompany,
        fetchCurrentCompany,
        isCurrentLoading,
        companyContracts,
        fetchCompanyContract,
        isContractsLoading,
        postContractSample,
        isContractSampleLoading,
        setCurrentCompany,
      }}
    >
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
