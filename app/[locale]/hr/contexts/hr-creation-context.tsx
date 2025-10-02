"use client";

import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Contract, Employee, HRCreationState } from "../types";
import { Passport, PassportType } from "../../shipping/types";
import {
  loadFaceApiModels,
  getFaceDescriptor,
  compareFaceDescriptors,
  cropFaceFromImage,
} from "../utils/face-detect-utils";
import { BaseAddressAPI } from "@/types/api";
import { useClient } from "@/src/contexts/legacy/profile-management/client-context";
import { useSearchParams } from "next/navigation";
import { Company, CompanyContracts } from "../../company/types";
import { addToast } from "@heroui/toast";
const HRCreationContext = createContext<any | undefined>(undefined);

export const HRCreationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { client } = useClient();
  const params = useSearchParams();
  const companyId = params.get("companyId");
  const contractUrl = `${BaseAddressAPI}Company/Contract/Download/${companyId}?contractType=0&&asFile=false`;
  const [hrStep, setHRStep] = useState<HRCreationState>(
    HRCreationState.Details,
  );

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const [employee, setEmployee] = useState<Employee>({
    name: client?.Info.Name || "",
    surname: client?.Info.Surname || "",
    contacts: client?.Info.Contacts || [{ id: 1, type: "Phone", data: "" }],
    passport: {
      type: 0,
    },
  });

  const isPassportValid = (passport: Passport): boolean =>
    passport?.type === PassportType.InternationalPassport
      ? !!passport?.frontSide
      : !!passport?.frontSide && !!passport?.backSide;

  const [isEmployeeValid, setEmployeeValid] = useState(false);
  const [passportImageError, setPassportImageError] = useState(false);

  const [employeePercentage, setDriverPassportPercentage] = useState(0);

  //---------------Face Detection Variables----------------

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [contract, setContract] = useState({ agreed: false });

  useEffect(() => {
    const loadModels = async () => {
      try {
        await loadFaceApiModels();
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load models", err);
      }
    };
    loadModels();
    if (companyId) fetchCurrentCompany(companyId);
  }, []);

  //---------------END Face Detection Code--------------

  useEffect(() => {
    const validations = {
      [HRCreationState.Details]: isEmployeeValid,
      [HRCreationState.Contract]: true,
    };

    setCanGoForward(validations[hrStep] ?? false);
    setCanSave(isEmployeeValid);

    setCanGoBack(hrStep !== HRCreationState.Details);
  }, [hrStep, isEmployeeValid]);

  const goForward = () => {
    if (!canGoForward) return;
    setHRStep((prev) => (prev + 1) as HRCreationState);
  };

  const goBack = () => {
    if (!canGoBack) return;
    setHRStep((prev) => (prev - 1) as HRCreationState);
  };

  const updateEmployee = async (d: Employee) => {
    setEmployee(d);
    var pError = false;
    if (isPassportValid(d.passport)) {
      if (d.passport.frontSide) {
        const image = URL.createObjectURL(d.passport.frontSide);
        const crop = await cropFaceFromImage(image);
        if (!crop) {
          pError = true;
        } else {
          pError = false;
        }
      }
    }
    setPassportImageError(pError);
    setEmployeeValid(
      isPassportValid(d.passport) &&
        !!d.name &&
        !!d.surname &&
        !!d.contacts &&
        !pError &&
        d.contacts.length > 0 &&
        !!d.contacts[0].data,
    );

    if (hrStep === HRCreationState.Details) {
      var passPerc = 0;
      if (d) {
        if (d.name) {
          passPerc += 20;
        }
        if (d.surname) {
          passPerc += 20;
        }
        if (d.contacts && d.contacts.length > 0 && d.contacts[0].data) {
          passPerc += 20;
        }
        if (d.passport) {
          passPerc += d.passport.frontSide
            ? d.passport.type === PassportType.InternationalPassport
              ? 40
              : 20
            : 0;
          passPerc += d.passport.backSide
            ? d.passport.type === PassportType.InternationalPassport
              ? 0
              : 20
            : 0;
        }
      }
      setDriverPassportPercentage(passPerc);
    }
  };

  const updateContract = (c: Contract) => {
    setContract(c);
  };
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    try {
      const response = await fetch(BaseAddressAPI + "Document/Upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      return result.Data;
    } catch (error) {
      return null;
    }
  };
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const { token } = useClient();

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
  const saveEmployee = () => {};

  return (
    <HRCreationContext.Provider
      value={{
        hrStep,
        canGoBack,
        canGoForward,
        canSave,
        passportImageError,
        goBack,
        goForward,
        modelsLoaded,
        employee,
        contract,
        updateContract,
        updateEmployee,
        isEmployeeValid,
        employeePercentage,
        companyId,
        contractUrl,
      }}
    >
      {children}
    </HRCreationContext.Provider>
  );
};

export const useHRCreation = () => {
  const context = useContext(HRCreationContext);
  if (!context) {
    throw new Error("useShipping must be used within a ShippingProvider");
  }
  return context;
};
