import { Contact } from "@/app/company/utils";
import { Passport } from "@/app/shipping/types";

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
