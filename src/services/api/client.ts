// API Client Configuration
// Centralized API client setup for the MMSH application

export const BaseAddressAPI = "http://mmsh.digital/api/";
export const BaseAddress = "http://mmsh.digital/";

// API Client interface for consistent error handling and request management
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Generic API client function with error handling
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BaseAddressAPI}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    return {
      data: null as T,
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// File upload helper
export const uploadFile = async (
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>
): Promise<ApiResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await fetch(`${BaseAddressAPI}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error(`File Upload Error for ${endpoint}:`, error);
    return {
      data: null,
      success: false,
      message: error instanceof Error ? error.message : "Upload failed",
    };
  }
};
