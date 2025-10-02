import { Icon } from "@iconify/react";
import { Bank } from "./contexts/create-company-context";

export interface Company {
  Id: string;
  Name: string;
  Type: { Id: number; Shortname: string; Type: string };
  Inn: string;
  Oked: string;
  Img: { Name: string };
  Addresses: Array<{
    Id: number;
    FormattedAddress: string;
    Location: string;
    IndexCode: number;
    Latitude: number;
    Longitude: number;
  }>;
  Contacts: Array<{ Id: number; Type: string; Data: string }>;
  Banks: Bank[];
  Documents: Array<{
    Id: number;
    Name: string;
    Filename: string;
    Size: number;
    Date: string;
  }>;
  Owner: string;
  State: number;
}

export const iconMap = {
  Phone: <Icon icon="line-md:phone" fontSize={18} />,
  Telegram: <Icon icon="line-md:telegram" fontSize={18} />,
  Whatsapp: <Icon icon="ic:baseline-whatsapp" fontSize={18} />,
  Instagram: <Icon icon="line-md:instagram" fontSize={18} />,
  Web: <Icon icon="ix:application-screen-globe" fontSize={18} />,
  Email: <Icon icon="line-md:email" fontSize={18} />,
  Others: <Icon icon="hugeicons:contact-01" fontSize={18} />,
};

export enum DocumentType {
  General = 0,
  Passport = 1,
  Contract = 2,
  License = 3,
  Permission = 4,
  Certification = 5,
  Other = 6,
}

export interface Document {
  Id: number;
  Name: string;
  Filename: string;
  Size: number;
  Date: string; // Use string for ISO date format
  Type: DocumentType;
  UploadedBy?: string;
}

export interface CompanyContracts {
  CompanyId: string;
  HRContract?: Document;
  PartnershipContract?: Document;
}

export enum CompanyContractSamples {
  HRContract = 0,
  PartnershipContract = 1,
}
