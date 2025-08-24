// Company Management Services
// Centralized company-related API calls

import { apiClient, ApiResponse, uploadFile } from './client';

export interface Company {
  id?: string;
  name: string;
  type: CompanyType | null;
  inn: string;
  contacts: Contact[];
  addresses: Address[];
  bankAccounts: Bank[];
}

export interface CompanyType {
  id: string;
  name: string;
  description?: string;
}

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  position?: string;
}

export interface Address {
  id?: string;
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  type: 'business' | 'billing' | 'shipping';
}

export interface Bank {
  id?: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

// Get all companies
export const getCompanies = async (): Promise<ApiResponse<Company[]>> => {
  return apiClient<Company[]>('Company/Get');
};

// Get company by ID
export const getCompanyById = async (id: string): Promise<ApiResponse<Company>> => {
  return apiClient<Company>(`Company/Get/${id}`);
};

// Create new company
export const createCompany = async (company: Company): Promise<ApiResponse<Company>> => {
  return apiClient<Company>('Company/Create', {
    method: 'POST',
    body: JSON.stringify(company),
  });
};

// Update existing company
export const updateCompany = async (
  id: string,
  company: Partial<Company>
): Promise<ApiResponse<Company>> => {
  return apiClient<Company>(`Company/Update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(company),
  });
};

// Delete company
export const deleteCompany = async (id: string): Promise<ApiResponse<void>> => {
  return apiClient<void>(`Company/Delete/${id}`, {
    method: 'DELETE',
  });
};

// Get company types
export const getCompanyTypes = async (): Promise<ApiResponse<CompanyType[]>> => {
  return apiClient<CompanyType[]>('Company/CompanyTypes/Get');
};

// Upload company documents
export const uploadCompanyDocument = async (
  companyId: string,
  file: File,
  documentType: string
): Promise<ApiResponse<any>> => {
  return uploadFile('Document/Upload', file, {
    companyId,
    documentType,
  });
};

// Upload multiple company files
export const uploadCompanyFiles = async (
  companyId: string,
  files: File[]
): Promise<ApiResponse<any>> => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });
  formData.append('companyId', companyId);

  return apiClient('Document/UploadFiles', {
    method: 'POST',
    body: formData,
    headers: {}, // Remove Content-Type to let browser set it for FormData
  });
};
