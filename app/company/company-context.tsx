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
}
interface Company {
  name: string;
  type: string;
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
  const [companyCreateState, setCompanyCreateState] = useState(
    CompanyCreateState.EnterCompanyDetails,
  );

  const [companyDetails, setCompanyDetails] = useState<string>("");

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
    type: "",
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
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const result = await response.json();
    } catch (error) {
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
    if (isCompanyDetailsValid && isBanksValid && isCompanyDocumentsValid) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [isCompanyDetailsValid, isBanksValid, isCompanyDocumentsValid]);

  useEffect(() => {
    if (companyCreateState === CompanyCreateState.EnterCompanyDetails) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [companyCreateState]);
  useEffect(() => {
    updateCompanyDetails();
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

  const updateCompanyDetails = () => {
    let cmpDet = "";
    if (company.name !== "") {
      cmpDet += `${company.name}, `;
    }
    if (company.type !== "") {
      cmpDet += `${company.type}, `;
    }
    if (company.inn !== "") {
      cmpDet += `INN: ${company.inn}, `;
    }
    if (company.oked !== "") {
      cmpDet += `OKED: ${company.oked}, `;
    }
    if (contacts.length > 0) {
      contacts.forEach((contact) => {
        if (contact.type !== "" && contact.data !== "") {
          cmpDet += `${contact.type} : ${contact.data}, `;
        }
      });
    }
    if (addresses.length > 0) {
      let count = 1;
      addresses.forEach((address) => {
        if (address.sattlement !== "" && address.location !== "") {
          cmpDet += `Address${count}: ${address.sattlement} , ${address.location}, `;
          count++;
        }
      });
    }

    setCompanyDetails(cmpDet);
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
        companyDetails,
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
      }}
    >
      {children}
    </CreateCompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CreateCompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a ClientProvider");
  }
  return context;
};
