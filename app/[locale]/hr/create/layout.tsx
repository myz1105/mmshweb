"use client";
import { HRCreationProvider } from "../contexts/hr-creation-context";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <HRCreationProvider>{children}</HRCreationProvider>;
};

export default MainLayout;
