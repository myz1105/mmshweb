"use client";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";

import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const t = useTranslations();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "uz", name: "O'zbekcha" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          size="sm"
          className="flex items-center gap-2"
          aria-label={t("Language.switch")}
        >
          <Globe
            className="text-default-500  hover:text-blue-500 transition"
            size={16}
          />
          <span className=" sm:inline">
            {currentLanguage?.name || "English"}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        onAction={(key) => switchLocale(key as string)}
        selectedKeys={[locale]}
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.code}
            className={locale === language.code ? "bg-default-100" : ""}
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
