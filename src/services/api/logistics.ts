// Logistics Management Services
// Centralized logistics, load, and shipping API calls

import { apiClient, ApiResponse, uploadFile } from './client';

export interface Load {
  id?: string;
  title: string;
  description?: string;
  weight: number;
  dimensions: Dimensions;
  pickupLocation: Location;
  deliveryLocation: Location;
  pickupDate: Date;
  deliveryDate: Date;
  price: number;
  currency: string;
  status: LoadStatus;
  requiredTrailer: TrailerType;
  contactInfo: ContactInfo;
  visibility: LoadVisibility;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'ft' | 'm' | 'in' | 'cm';
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  name: string;
  phone: string;
  email?: string;
  company?: string;
}

export type LoadStatus = 
  | 'draft' 
  | 'published' 
  | 'assigned' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

export type TrailerType = 
  | 'dry_van' 
  | 'refrigerated' 
  | 'flatbed' 
  | 'step_deck' 
  | 'lowboy' 
  | 'tanker';

export type LoadVisibility = 'public' | 'private' | 'network';

export interface Route {
  id?: string;
  loadId: string;
  waypoints: Location[];
  distance: number;
  estimatedTime: number;
  optimized: boolean;
}

export interface Truck {
  id?: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  trailerType: TrailerType;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_service';
  driverId?: string;
}

// Load Management
export const getLoads = async (): Promise<ApiResponse<Load[]>> => {
  return apiClient<Load[]>('Load/Get');
};

export const getLoadById = async (id: string): Promise<ApiResponse<Load>> => {
  return apiClient<Load>(`Load/Get/${id}`);
};

export const createLoad = async (load: Load): Promise<ApiResponse<Load>> => {
  return apiClient<Load>('Load/Create', {
    method: 'POST',
    body: JSON.stringify(load),
  });
};

export const updateLoad = async (
  id: string,
  load: Partial<Load>
): Promise<ApiResponse<Load>> => {
  return apiClient<Load>(`Load/Update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(load),
  });
};

export const deleteLoad = async (id: string): Promise<ApiResponse<void>> => {
  return apiClient<void>(`Load/Delete/${id}`, {
    method: 'DELETE',
  });
};

// Route Management
export const createRoute = async (route: Route): Promise<ApiResponse<Route>> => {
  return apiClient<Route>('Route/Create', {
    method: 'POST',
    body: JSON.stringify(route),
  });
};

export const optimizeRoute = async (
  waypoints: Location[]
): Promise<ApiResponse<Route>> => {
  return apiClient<Route>('Route/Optimize', {
    method: 'POST',
    body: JSON.stringify({ waypoints }),
  });
};

// Truck Management
export const getTrucks = async (): Promise<ApiResponse<Truck[]>> => {
  return apiClient<Truck[]>('Truck/Get');
};

export const getTruckById = async (id: string): Promise<ApiResponse<Truck>> => {
  return apiClient<Truck>(`Truck/Get/${id}`);
};

export const createTruck = async (truck: Truck): Promise<ApiResponse<Truck>> => {
  return apiClient<Truck>('Truck/Create', {
    method: 'POST',
    body: JSON.stringify(truck),
  });
};

export const updateTruck = async (
  id: string,
  truck: Partial<Truck>
): Promise<ApiResponse<Truck>> => {
  return apiClient<Truck>(`Truck/Update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(truck),
  });
};

// Load Settings and Packs
export const getLoadPacks = async (): Promise<ApiResponse<any[]>> => {
  return apiClient<any[]>('LoadSettings/LoadPacks/Get');
};

export const getTruckPacks = async (): Promise<ApiResponse<any[]>> => {
  return apiClient<any[]>('LoadSettings/TruckPacks/Get');
};

export const createLoadPack = async (pack: any): Promise<ApiResponse<any>> => {
  return apiClient<any>('LoadSettings/LoadPacks/Create', {
    method: 'POST',
    body: JSON.stringify(pack),
  });
};

export const createTruckPack = async (pack: any): Promise<ApiResponse<any>> => {
  return apiClient<any>('LoadSettings/TruckPacks/Create', {
    method: 'POST',
    body: JSON.stringify(pack),
  });
};

// Upload load-related documents
export const uploadLoadDocument = async (
  loadId: string,
  file: File,
  documentType: string
): Promise<ApiResponse<any>> => {
  return uploadFile('Document/Upload', file, {
    loadId,
    documentType,
  });
};
