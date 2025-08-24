import { Icon } from "@iconify/react";
import { Contact } from "../company/utils";

export enum ShippingCreationState {
  PassportOfDriver,
  DriverCard,
  TruckPassport,
  TrailerPassport,
  ShippingDetails,
  TruckImages,
}

export enum PassportType {
  InternationalPassport,
  DriverCard,
  IdCard,
  TruckPassport,
  TrailerPassport,
}

export interface Passport {
  type?: PassportType;
  frontSide?: File;
  backSide?: File;
}
export interface Driver {
  name: string;
  surname: string;
  contacts: Contact[];
  passport: Passport;
  driverCard: Passport;
}

export interface Transport {
  name?: string;
  carNumber: string;
  passport: Passport;
}

export interface Shipping {
  driver: Driver;
  truck: Transport;
  trailer: Transport;
  price: { value: number; unit: string };
  dispatcher: any;
  truckImages?: TruckImages;
}

export interface TruckImages {
  front?: File;
  back?: File;
  right?: File;
  left?: File;
}

export const contactIconMap = {
  Phone: <Icon icon="line-md:phone" fontSize={18} />,
  Telegram: <Icon icon="line-md:telegram" fontSize={18} />,
  Whatsapp: <Icon icon="ic:baseline-whatsapp" fontSize={18} />,
  Instagram: <Icon icon="line-md:instagram" fontSize={18} />,
  Web: <Icon icon="ix:application-screen-globe" fontSize={18} />,
  Email: <Icon icon="line-md:email" fontSize={18} />,
  Others: <Icon icon="hugeicons:contact-01" fontSize={18} />,
};
