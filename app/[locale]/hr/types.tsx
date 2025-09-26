import { Contact } from "../company/utils";
import { Passport } from "../shipping/types";

export enum HRCreationState {
  Details,
  Contract,
}

export interface Employee {
  name: string;
  surname: string;
  contacts: Contact[];
  passport: Passport;
  face?: File;
}

export interface Contract {
  originalImage?: File;
  face?: File;
  agreed: boolean;
  approved: boolean;
}

export interface EmployeeData {
  id: string;
  name: string;
  surname: string;
  contacts: Contact[];
  passport: {
    type?: number;
    frontSide?: string;
    backSide?: string;
  };
  contract: {
    realImage?: string;
    agreed: boolean;
    approved: boolean;
  };
  company: any;
}
