"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";

interface ProvidersProps {
  themeProps?: ThemeProviderProps;
  children?: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children, themeProps }) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
};

// Wrap Providers with appWithTranslation
export default Providers;
