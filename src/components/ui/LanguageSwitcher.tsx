"use client";

import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Globe } from "lucide-react";
import { useHydrationSafeLanguage } from "@/hooks/useHydrationSafeLanguage";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const safeLanguage = useHydrationSafeLanguage();

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "uz", name: "O'zbekcha" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update html lang attribute
    document.documentElement.lang = lng;
  };

  const currentLanguage = languages.find((lang) => lang.code === safeLanguage);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          size="sm"
          className="flex items-center gap-2"
          aria-label={t("Language.switch")}
        >
          <Globe className="text-default-500  hover:text-blue-500 transition" size={16} />
          <span className="hidden sm:inline">
            {currentLanguage?.name || "English"}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        onAction={(key) => changeLanguage(key as string)}
        selectedKeys={[safeLanguage]}
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.code}
            className={safeLanguage === language.code ? "bg-default-100" : ""}
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
