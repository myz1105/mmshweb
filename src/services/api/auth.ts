// Authentication Services
// Centralized authentication API calls

import { apiClient, ApiResponse } from './client';

export interface AuthInitRequest {
  phoneNumber: string;
  clientId: string;
}

export interface AuthInitResponse {
  token?: string;
  clientInfo?: any;
  success: boolean;
}

export interface ClientInfo {
  id: string;
  name: string;
  phone: string;
  email?: string;
  // Add other client properties as needed
}

// Initialize client authentication
export const initializeAuth = async (
  phone: string,
  clientId: string
): Promise<ApiResponse<AuthInitResponse>> => {
  return apiClient<AuthInitResponse>('Account/Init', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: phone,
      clientId: clientId,
    }),
  });
};

// Fetch client information
export const fetchClient = async (
  phone: string,
  clientId: string
): Promise<ApiResponse<ClientInfo>> => {
  return apiClient<ClientInfo>('Account/GetClient', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: phone,
      clientId: clientId,
    }),
  });
};

// Verify phone number
export const verifyPhone = async (
  phone: string,
  verificationCode: string
): Promise<ApiResponse<any>> => {
  return apiClient('Account/VerifyPhone', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: phone,
      code: verificationCode,
    }),
  });
};

// Send verification code
export const sendVerificationCode = async (
  phone: string
): Promise<ApiResponse<any>> => {
  return apiClient('Account/SendCode', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: phone,
    }),
  });
};
