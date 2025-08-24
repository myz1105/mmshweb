// API Services Barrel Export
// Centralized exports for all API services

export * from './client';
export * from './auth';
export * from './company';
export * from './logistics';

// Re-export commonly used types
export type {
  ApiResponse,
} from './client';

export type {
  AuthInitRequest,
  AuthInitResponse,
  ClientInfo,
} from './auth';

export type {
  Company,
  CompanyType,
  Contact,
  Address,
  Bank,
} from './company';

export type {
  Load,
  Dimensions,
  Location,
  ContactInfo,
  LoadStatus,
  TrailerType,
  LoadVisibility,
  Route,
  Truck,
} from './logistics';
