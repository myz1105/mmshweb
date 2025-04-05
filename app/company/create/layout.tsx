"use client";
import { CreateCompanyProvider } from "../contexts/create-company-context";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <CreateCompanyProvider>{children}</CreateCompanyProvider>;
};

export default MainLayout;
