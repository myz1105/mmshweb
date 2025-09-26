import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import Providers from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Sidebar from "@/components/main_components/sidebar";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { ClientProvider } from "@/contexts/profile-management/client-context";
import { SignalRProvider } from "@/contexts/profile-management/signalR-context";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

//  Remove static metadata and use a function to generate it dynamically
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "MMSH Logistics",
      template: "%s - MMSH Logistics",
    },
    description: "MMSH Logistics Web Application",
    icons: {
      icon: "/logo_fixed.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider>
          <ClientProvider>
            <SignalRProvider hubName="MMSHHUB/Notification">
              <Providers
                themeProps={{ attribute: "class", defaultTheme: "dark" }}
              >
                {children}
              </Providers>
            </SignalRProvider>
          </ClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
