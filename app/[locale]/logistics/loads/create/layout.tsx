"use client";
import { CreateLoadProvider } from "../contexts/create-load-context";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <CreateLoadProvider>{children}</CreateLoadProvider>;
};

export default MainLayout;
