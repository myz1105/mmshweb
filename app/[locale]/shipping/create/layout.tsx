"use client";
import { ShippingProvider } from "../contexts/shipping-creation-context";
import { ShippingCreationState } from "../types";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <ShippingProvider>{children}</ShippingProvider>;
};

export default MainLayout;
