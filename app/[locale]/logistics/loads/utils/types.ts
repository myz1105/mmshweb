import { Address } from "@/types/api";

export enum LoadReadyState {
  LoadIsReadyAt,
  Always,
  NotReadyYet,
}
export enum Workdays {
  onlyWorkDays,
  Everyday,
}

export interface LoadDetails {
  name: string;
  weight?: { value: number; unit: string };
  volume?: { value: number; unit: string };

  package?: {
    name: string;
    quantity: number;
    diameter: { value: number; unit: string };
    length: { value: number; unit: string };
    width: { value: number; unit: string };
    height: { value: number; unit: string };
  };
}

export interface LoadRoute {
  when: {
    state: LoadReadyState;
    dateInterval?: DateRange;
    uploadValidation?: Workdays;
  };
  uploading: {
    address?: Address;
    location: string;
    uploadingTime?: TimeRange;
  };
  downloading: {
    address?: Address;
    location: string;
    downloadingTime?: DateTimeRange;
  };
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export interface TimeRange {
  from: Time;
  to: Time;
  isAllways: boolean;
}

export interface DateTimeRange {
  dateRange: DateRange;
  timeRange: TimeRange;
}

export enum LoadingVolumeFeature {
  FTL,
  FTLOrLTL,
}

export interface TrailerDetails {
  trailerTypes: { id: number; name: string }[];
  loadingFeature: { name: string }[];
  unloadingFeature: { name: string }[];
  numberOfCars: number;
  adr: number;
  isTwoDriverRequired: boolean;
  loadingVolumeFeature: LoadingVolumeFeature;
  numberOfRequiredBelts?: number;
  permissions?: { name: string }[];
  requirements?: { name: string }[];
}

export interface ContractInformation {
  loadPrice?: {
    value: number;
    unit: string;
  };
  shippingPrice?: {
    min: number;
    max: number;
    unit: string;
  };
  manager?: any;
  partner?: any;
  creator?: any;
}

export enum LoadVisibility {
  forSelectedUsers,
  forSelectedGroups,
  forEveryone,
  forMe,
}

export const LoadVisibilityDescription: { [key in LoadVisibility]: string } = {
  [LoadVisibility.forSelectedUsers]: "For selected users",
  [LoadVisibility.forSelectedGroups]: "For selected groups",
  [LoadVisibility.forEveryone]: "For everyone",
  [LoadVisibility.forMe]: "For me",
};

export enum LoadStatus {
  Active,
  Finished,
  Inactive,
}
export const LoadStatusDescription: { [key in LoadStatus]: string } = {
  [LoadStatus.Active]: "Active",
  [LoadStatus.Finished]: "Finished",
  [LoadStatus.Inactive]: "Inactive",
};

export const LoadingVolumeFeatureDescription: {
  [key in LoadingVolumeFeature]: {
    description: string;
    key: LoadingVolumeFeature;
    shortName: string;
  };
} = {
  [LoadingVolumeFeature.FTL]: {
    shortName: "FTL",
    key: LoadingVolumeFeature.FTL,
    description: "Separate machine",
  },
  [LoadingVolumeFeature.FTLOrLTL]: {
    shortName: "FTL or LTL",
    key: LoadingVolumeFeature.FTLOrLTL,
    description: "By separate vehicle or additional load",
  },
};

export interface LoadInformationFeatures {
  visibility: LoadVisibility;
  status: LoadStatus;
  selectedUsers?: any;
  selectedGroups?: any;
}

export const WorkdayDescriptions: { [key in Workdays]: string } = {
  [Workdays.Everyday]: "Everyday",
  [Workdays.onlyWorkDays]: "Only work days",
};

export const LoadReadyStateDescriptions: { [key in LoadReadyState]: string } = {
  [LoadReadyState.LoadIsReadyAt]: "Ready for loading",
  [LoadReadyState.Always]: "Constantly",
  [LoadReadyState.NotReadyYet]: "No load, request a rate",
};

export interface Load {
  loadDetails: LoadDetails;
  loadRoute: LoadRoute;
  trailerDetails: TrailerDetails;
  contacts: ContractInformation;
  feature: LoadInformationFeatures;
}
