"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

const languages: string[] = ["eng", "uzb", "rus"];

const LanguageToggle: React.FC = () => {
  const { t } = useTranslation();

  // Load language from localStorage or default to 'eng'
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    return localStorage.getItem("selectedLang") || "eng";
  });

  useEffect(() => {
    i18n.changeLanguage(selectedLang); // Apply saved language
  }, [selectedLang]);

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(selectedLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];

    setSelectedLang(newLang);
    i18n.changeLanguage(newLang); // Change i18n language
    localStorage.setItem("selectedLang", newLang); // Save to localStorage
  };

  return (
    <>
      <Button
        onClick={toggleLanguage}
        className="text-md text-color-default"
        startContent={<FaGlobe className="text-primary" />}
        color="secondary"
        variant="ghost"
        style={{ marginLeft: "10px" }}
      >
        {selectedLang}
      </Button>
    </>
  );
};

export default LanguageToggle;
