"use client";
import { useState, useEffect } from "react";
import { SocialMedia } from "@/components/ui/SocialMedia";
import { Divider } from "@heroui/react";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <footer className="w-full bg-inherit relative pt-4">
      <div className="max-w-6xl mx-auto px-6  flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Logo / Brand */}
        <div className="text-lg font-bold">{t("siteConfig.name")}</div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <SocialMedia />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-4 relative z-10">
        &copy; {new Date().getFullYear()} {t("Footer.rights")}
      </div>
    </footer>
  );
};
