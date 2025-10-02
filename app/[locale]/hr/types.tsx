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

// Utility function to check if a flag is set
export function hasRoleFlag(
  role: DataManageRole,
  flag: DataManageRole,
): boolean {
  return (role & flag) === flag;
}
export enum DataManageRole {
  None = 0,
  Read = 1,
  Use = 2,
  Edit = 4,
  Add = 8,
  Delete = 16,
  Permit = 32,
  All = Read | Use | Edit | Add | Delete | Permit,
}

export enum CompanyRoles {
  None = 0,
  Driver = 1 << 0,
  FleetManager = 1 << 1,
  Dispatcher = 1 << 2,
  Sales = 1 << 3,
  Manager = 1 << 4,
  HR = 1 << 5,
  WarehouseStaff = 1 << 6,
  Accountant = 1 << 7,
  ITSupport = 1 << 8,
  Director = 1 << 9,
  GeneralDirector = 1 << 10,
  Admin = 1 << 11,
  All = Driver |
    Dispatcher |
    Manager |
    HR |
    Accountant |
    Director |
    GeneralDirector |
    WarehouseStaff |
    FleetManager |
    ITSupport |
    Sales |
    Admin,
}

export interface HRPermissions {
  role: DataManageRole;
  contract: DataManageRole;
  dailyActivation: DataManageRole;
  reports: DataManageRole;
  analytics: DataManageRole;
  settings: DataManageRole;
  employees: DataManageRole;
  salary: DataManageRole;
}

export interface LogisticsPermissions {
  loads: DataManageRole;
  shippings: DataManageRole;
  reports: DataManageRole;
  analytics: DataManageRole;
  settings: DataManageRole;
  partners: DataManageRole;
  groups: DataManageRole;
}

export interface AccountingPermissions {
  invoices: DataManageRole;
  payments: DataManageRole;
  reports: DataManageRole;
  analytics: DataManageRole;
  settings: DataManageRole;
  partners: DataManageRole;
  groups: DataManageRole;
  contract: DataManageRole;
  dailyActivation: DataManageRole;
  salary: DataManageRole;
}

export interface CompanyPermissions {
  id: number;
  companyId: string;
  clientId: string;
  hr?: HRPermissions;
  logistics?: LogisticsPermissions;
  accounting?: AccountingPermissions;
  companyInformation: DataManageRole;
  documentation: DataManageRole;
  roles: CompanyRoles;
}

// Add this mapper to your file or a shared constants/util file

export const DataManageRoleInfo: Record<
  DataManageRole,
  { name: string; description: string }
> = {
  [DataManageRole.None]: {
    name: "None",
    description: "No permissions granted",
  },
  [DataManageRole.Read]: {
    name: "Read",
    description: "Allows reading data",
  },
  [DataManageRole.Use]: {
    name: "Use",
    description: "Allows using data",
  },
  [DataManageRole.Edit]: {
    name: "Edit",
    description: "Allows editing data",
  },
  [DataManageRole.Add]: {
    name: "Add",
    description: "Allows adding new data",
  },
  [DataManageRole.Delete]: {
    name: "Delete",
    description: "Allows deleting data",
  },
  [DataManageRole.Permit]: {
    name: "Permit",
    description: "Allows permitting actions",
  },
  [DataManageRole.All]: {
    name: "All",
    description: "All permissions granted",
  },
};

export type ContractStatus = "Pending" | "Active" | "Rejected" | "Completed";

export interface ContractGraph {
  Id: string;
  Name: string;
  Surname: string;
  ClientId?: string;
  Agreed: boolean;
  Approved: boolean;
  Date?: string; // ISO string
  Company?: string;
  Status: ContractStatus;
  Roles?: string;
  Contacts?: string;
  Img: string;
}

export const contractGraphFakeData: ContractGraph[] = [
  {
    Id: "c1",
    Name: "John",
    Surname: "Doe",
    ClientId: "client123",
    Agreed: true,
    Approved: false,
    Date: "2025-09-15T10:30:00Z",
    Company: "Acme Corp",
    Status: "Pending",
    Roles: "Manager,HR",
    Contacts: "john.doe@acme.com,+123456789",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    Id: "c2",
    Name: "Jane",
    Surname: "Smith",
    ClientId: "client456",
    Agreed: true,
    Approved: true,
    Date: "2025-09-20T14:00:00Z",
    Company: "Beta Ltd",
    Status: "Active",
    Roles: "Accountant",
    Contacts: "jane.smith@beta.com,+987654321",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
  },
  {
    Id: "c3",
    Name: "Alice",
    Surname: "Brown",
    Agreed: false,
    Approved: false,
    Date: "2025-08-10T09:00:00Z",
    Company: "Gamma LLC",
    Status: "Rejected",
    Roles: "Sales",
    Contacts: "alice.brown@gamma.com,+1122334455",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    Id: "c4",
    Name: "Bob",
    Surname: "Johnson",
    ClientId: "client789",
    Agreed: true,
    Approved: true,
    Date: "2025-09-25T11:00:00Z",
    Company: "Delta Inc",
    Status: "Active",
    Roles: "Manager,HR",
    Contacts: "bob.johnson@delta.com,+1231231234",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026700d",
  },
  {
    Id: "c5",
    Name: "Eve",
    Surname: "Davis",
    ClientId: "client101",
    Agreed: false,
    Approved: false,
    Date: "2025-08-30T12:00:00Z",
    Company: "Epsilon Inc",
    Status: "Rejected",
    Roles: "Sales",
    Contacts: "eve.davis@epsilon.com,+1231231234",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
  },
  {
    Id: "c6",
    Name: "Charlie",
    Surname: "Brown",
    ClientId: "client102",
    Agreed: true,
    Approved: false,
    Date: "2025-09-30T15:00:00Z",
    Company: "Zeta Corp",
    Status: "Pending",
    Roles: "Manager",
    Contacts: "charlie.brown@zeta.com,+1231231234",
    Img: "https://i.pravatar.cc/150?u=a042581f4e29026699d",
  },
];
