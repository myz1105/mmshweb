"use client";
import { useState, useEffect } from "react";
import { SocialMedia } from "./mini_components/Social_media";
import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { t } = useTranslation(); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <footer className="w-full bg-inherit py-6 relative">
      <Divider className="my-4" />
      <div className="max-w-6xl mx-auto px-6  flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Logo / Brand */}
        <div className="text-lg font-bold ">MMSH</div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <SocialMedia />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-4 relative z-10">
        &copy; {new Date().getFullYear()} MMSH Logistics. {t('Footer.rights')}
      </div>
    </footer>
  );
};
