"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { BaseAddressAPI } from "@/types/api";
import { addToast } from "@heroui/toast";
import { get } from "http";
import { type } from "os";
import { CompanyType } from "../create/constants";
import { FieldState } from "@/components/mini_components/addressselector";
import { useClient } from "@/contexts/profile-management/client-context";
import { useRouter } from "next/navigation";
const CreateCompanyContext = createContext<any | undefined>(undefined);

export enum CompanyCreateState {
  EnterCompanyDetails,
  EnterCompanyServiceTypes,
  EnterCompanyBankDetails,
  EnterCompanyDocuments,
}

interface Contact {
  id: number;
  type: string;
  data: string;
}
interface Address {
  id: number;
  sattlement: string;
  location: string;
  fieldState?: FieldState;
}
interface Company {
  name: string;
  type: CompanyType | null;
  inn: string;
  oked: string;
  img: string;
}

export interface BankAccount {
  id: number;
  AccountNumber: string;
  AccountType: string;
}

export interface Bank {
  id: number;
  Name: string;
  MFO: string;
  Address: string;
  AccountNumbers: BankAccount[];
}

export const CreateCompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [companyCreateState, setCompanyCreateState] = useState(
    CompanyCreateState.EnterCompanyDetails,
  );

  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);

  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, type: "Phone", data: "" },
    { id: 2, type: "Web", data: "" },
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, sattlement: "", location: "" },
  ]);
  const [bankAccounts, setBankAccounts] = useState<Bank[]>([
    {
      id: 1,
      Name: "",
      MFO: "",
      Address: "",
      AccountNumbers: [{ id: 1, AccountNumber: "", AccountType: "USD" }],
    },
  ]);

  const [company, setCompany] = useState<Company>({
    name: "",
    type: null,
    inn: "",
    oked: "",
    img: "",
  });
  const [isCompanyDetailsValid, setCompanyDetailsValidation] =
    useState<boolean>(false);
  const [
    companyDetailsCompilationPercentage,
    setCompanyDetailsCompilationPercentage,
  ] = useState(0);

  const [isBanksValid, setBankValidation] = useState(false);
  const [bankDataCompilationPercentage, setBankDataCompilationPercentage] =
    useState(0);

  const [files, setFiles] = useState<File[]>([]);

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(BaseAddressAPI + "Document/UploadFiles", {
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
  const [isCompanyDocumentsValid, setCompanyDocumentsValidation] =
    useState(false);
  const [
    companyDocsCompilationPercentage,
    setCompanyDocsCompilationPercentage,
  ] = useState(0);

  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [isOnSaving, setOnSaving] = useState(false);

  const contactTypes = [
    "Phone",
    "Telegram",
    "Whatsapp",
    "Instagram",
    "Web",
    "Email",
    "Others",
  ];

  useEffect(() => {
    fetchCompanyTypes();
  }, []);

  useEffect(() => {
    if (companyCreateState === CompanyCreateState.EnterCompanyDetails) {
      setCanGoForward(isCompanyDetailsValid);
    } else if (
      companyCreateState === CompanyCreateState.EnterCompanyBankDetails
    ) {
      setCanGoForward(isBanksValid);
    } else if (
      companyCreateState === CompanyCreateState.EnterCompanyDocuments
    ) {
      setCanGoForward(isCompanyDocumentsValid);
    }

    if (
      isCompanyDetailsValid &&
      isBanksValid &&
      isCompanyDocumentsValid &&
      !isOnSaving
    ) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [
    isCompanyDetailsValid,
    isBanksValid,
    isCompanyDocumentsValid,
    isOnSaving,
  ]);

  useEffect(() => {
    if (companyCreateState === CompanyCreateState.EnterCompanyDetails) {
      setCanGoForward(isCompanyDetailsValid);
    } else if (
      companyCreateState === CompanyCreateState.EnterCompanyBankDetails
    ) {
      setCanGoForward(isBanksValid);
    } else if (
      companyCreateState === CompanyCreateState.EnterCompanyDocuments
    ) {
      setCanGoForward(isCompanyDocumentsValid);
    }
    if (companyCreateState === CompanyCreateState.EnterCompanyDetails) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [companyCreateState]);
  useEffect(() => {
    let compDetValid = !!(
      company.name &&
      company.inn &&
      company.type &&
      contacts[0].type &&
      contacts[0].data &&
      addresses[0].sattlement &&
      addresses[0].location
    );
    setCompanyDetailsValidation(compDetValid);
    let percentCompDet = 0;
    if (company.name) percentCompDet += 20;
    if (company.type) percentCompDet += 20;
    if (company.inn) percentCompDet += 20;
    if (contacts[0].type && contacts[0].data) percentCompDet += 20;
    if (addresses[0].sattlement && addresses[0].location) percentCompDet += 20;
    setCompanyDetailsCompilationPercentage(percentCompDet);
  }, [company, contacts, addresses]);

  useEffect(() => {
    let bankDataValid = !!(
      bankAccounts[0].Name &&
      bankAccounts[0].MFO &&
      bankAccounts[0].AccountNumbers[0].AccountNumber &&
      bankAccounts[0].AccountNumbers[0].AccountType
    );
    setBankValidation(bankDataValid);

    let perc = 0;
    if (bankAccounts[0].Name) perc += 25;
    if (bankAccounts[0].MFO) perc += 25;
    if (
      bankAccounts[0].AccountNumbers[0].AccountNumber &&
      bankAccounts[0].AccountNumbers[0].AccountType
    )
      perc += 50;

    setBankDataCompilationPercentage(perc);
  }, [bankAccounts]);

  useEffect(() => {
    setCompanyDocumentsValidation(files.length >= 3);
    let result = files.length >= 3 ? 100 : files.length * 33;
    setCompanyDocsCompilationPercentage(result);
  }, [files]);

  const fetchCompanyTypes = async () => {
    try {
      const res = await fetch(BaseAddressAPI + "Company/CompanyTypes/Get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        addToast({
          title: "Error",
          description: "Error occured while request.",
          color: "danger",
        });
        return;
      }
      const result = await res.json();
      setCompanyTypes(result);
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
    }
  };

  const { client } = useClient();

  const SaveCompany = async () => {
    setOnSaving(true);

    var docs = await uploadFiles();
    var img = await handleUploadImage();
    try {
      const res = await fetch(BaseAddressAPI + "Company/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: company.name,
          inn: company.inn,
          oked: company.oked,
          type: company.type,
          img: img ? img.Data : null,
          addresses: addresses,
          contacts: contacts,
          documents: docs ? docs : [],
          owner: client.Id,
          banks: bankAccounts,
        }),
      });

      if (!res.ok) {
        addToast({
          title: "Error",
          description: "Error occured while request.",
          color: "danger",
        });
        return;
      }
      setOnSaving(false);
      router.replace("/company");
    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
      setOnSaving(false);
    }
  };

  const handleUploadImage = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!company.img) {
        reject(new Error("No image source provided"));
        return;
      }

      const base64Image = company.img; // Get the base64 image
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
        const apiUrl = BaseAddressAPI + "Img/Upload"; // Replace with your API URL
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

  const updateCompany = (company: Company) => {
    setCompany(company);
  };
  const addContact = () => {
    var count = contacts.length;
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: count + 1, type: contactTypes[count % 7], data: "" },
    ]);
  };

  const updateContact = (contact: Contact) => {
    setContacts((prevContacts) => {
      const index = prevContacts.findIndex((c) => c.id === contact.id);
      if (index === -1) {
        return prevContacts;
      }
      const newContacts = [...prevContacts];
      newContacts[index] = contact;
      return newContacts;
    });
  };
  const removeContact = (id: number) => {
    setContacts((prevContacts) => {
      const index = prevContacts.findIndex((c) => c.id === id);
      if (index === -1) {
        return prevContacts;
      }
      const newContacts = [...prevContacts];
      newContacts.splice(index, 1);
      return newContacts;
    });
  };

  const addAddress = () => {
    var count = addresses.length;
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      { id: count + 1, sattlement: "", location: "" },
    ]);
  };

  const updateAddress = (address: Address) => {
    setAddresses((prevAddresses) => {
      const index = prevAddresses.findIndex((c) => c.id === address.id);
      if (index === -1) {
        return prevAddresses;
      }
      const newAddresses = [...prevAddresses];
      newAddresses[index] = address;
      return newAddresses;
    });
  };

  const removeAddress = (id: number) => {
    setAddresses((prevAddresses) => {
      const index = prevAddresses.findIndex((c) => c.id === id);
      if (index === -1) {
        return prevAddresses;
      }
      const newAddresses = [...prevAddresses];
      newAddresses.splice(index, 1);
      return newAddresses;
    });
  };

  const addBank = () => {
    var count = bankAccounts.length;
    setBankAccounts((prevBankAccounts) => [
      ...prevBankAccounts,
      {
        id: count + 1,
        Name: "",
        MFO: "",
        Address: "",
        AccountNumbers: [{ id: 1, AccountNumber: "", AccountType: "USD" }],
        AccountType: "",
      },
    ]);
  };

  const updateBank = (bankAccount: Bank) => {
    setBankAccounts((prevBankAccounts) => {
      const index = prevBankAccounts.findIndex((b) => b.id === bankAccount.id);
      if (index === -1) {
        return prevBankAccounts;
      }
      const newBankAccounts = [...prevBankAccounts];
      newBankAccounts[index] = bankAccount;
      return newBankAccounts;
    });
  };

  const removeBank = (id: number) => {
    setBankAccounts((prevBankAccounts) => {
      const index = prevBankAccounts.findIndex((b) => b.id === id);
      if (index === -1) {
        return prevBankAccounts;
      }
      const newBankAccounts = [...prevBankAccounts];
      newBankAccounts.splice(index, 1);
      return newBankAccounts;
    });
  };

  const addBankAccount = (bankId: number) => {
    const prevBankAccounts = bankAccounts;
    const index = prevBankAccounts.findIndex((b) => b.id === bankId);
    if (index === -1) {
      return prevBankAccounts;
    }
    const newBankAccounts = [...prevBankAccounts];
    const lastAccount =
      newBankAccounts[index].AccountNumbers[
        newBankAccounts[index].AccountNumbers.length - 1
      ];
    newBankAccounts[index].AccountNumbers.push({
      id: lastAccount ? lastAccount.id + 1 : 1,
      AccountNumber: "",
      AccountType: "USD",
    });
    setBankAccounts(newBankAccounts);
  };

  const updateBankAccount = (bankId: number, bankAccount: BankAccount) => {
    const prevBankAccounts = bankAccounts;
    const bankIndex = prevBankAccounts.findIndex((b) => b.id === bankId);
    if (bankIndex === -1) {
      return prevBankAccounts;
    }
    const newBankAccounts = [...prevBankAccounts];
    const accountIndex = newBankAccounts[bankIndex].AccountNumbers.findIndex(
      (a) => a.id === bankAccount.id,
    );
    if (accountIndex === -1) {
      return prevBankAccounts;
    }
    newBankAccounts[bankIndex].AccountNumbers[accountIndex] = bankAccount;
    setBankAccounts(newBankAccounts);
  };

  const removeBankAccount = (bankId: number, accountId: number) => {
    setBankAccounts((prevBankAccounts) => {
      const bankIndex = prevBankAccounts.findIndex((b) => b.id === bankId);
      if (bankIndex === -1) {
        return prevBankAccounts;
      }
      const newBankAccounts = [...prevBankAccounts];
      if (newBankAccounts.length === 1) prevBankAccounts;
      const accountIndex = newBankAccounts[bankIndex].AccountNumbers.findIndex(
        (a) => a.id === accountId,
      );
      if (accountIndex === -1) {
        return prevBankAccounts;
      }
      newBankAccounts[bankIndex].AccountNumbers.splice(accountIndex, 1);
      return newBankAccounts;
    });
  };

  const removeFile = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const goBack = () => {
    if (canGoBack) {
      if (companyCreateState === CompanyCreateState.EnterCompanyBankDetails) {
        setCompanyCreateState(CompanyCreateState.EnterCompanyDetails);
      } else if (
        companyCreateState === CompanyCreateState.EnterCompanyDocuments
      ) {
        setCompanyCreateState(CompanyCreateState.EnterCompanyBankDetails);
      }
    }
  };

  const goForward = () => {
    if (canGoForward) {
      if (companyCreateState === CompanyCreateState.EnterCompanyDetails) {
        setCompanyCreateState(CompanyCreateState.EnterCompanyBankDetails);
      } else if (
        companyCreateState === CompanyCreateState.EnterCompanyBankDetails
      ) {
        setCompanyCreateState(CompanyCreateState.EnterCompanyDocuments);
      } else if (
        companyCreateState === CompanyCreateState.EnterCompanyDocuments
      ) {
        setCompanyCreateState(CompanyCreateState.EnterCompanyServiceTypes);
      }
    }
  };

  return (
    <CreateCompanyContext.Provider
      value={{
        companyCreateState,
        setCompanyCreateState,
        contacts,
        addContact,
        updateContact,
        removeContact,
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        company,
        updateCompany,
        isCompanyDetailsValid,
        companyDetailsCompilationPercentage,
        canGoBack,
        canGoForward,
        canSave,
        bankAccounts,
        addBankAccount,
        addBank,
        removeBankAccount,
        removeBank,
        updateBankAccount,
        updateBank,
        isBanksValid,
        bankDataCompilationPercentage,
        files,
        setFiles,
        isCompanyDocumentsValid,
        companyDocsCompilationPercentage,
        removeFile,
        goBack,
        goForward,
        companyTypes,
        SaveCompany,
        isOnSaving,
      }}
    >
      {children}
    </CreateCompanyContext.Provider>
  );
};

export const useCreateCompany = () => {
  const context = useContext(CreateCompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CreateCompanyProvider");
  }
  return context;
};
