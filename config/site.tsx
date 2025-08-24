"use client";
import { useTranslation } from "react-i18next";

// Server-side compatible site config (for static generation)
export const getSiteConfig = (language: string = "en") => {
  // Simple translation mapping for server-side use
  const translations: Record<string, Record<string, string>> = {
    en: {
      "Navbar.home": "Home",
      "Navbar.blog": "Blog",
      "Navbar.about": "About",
      "Navbar.profile": "Profile",
      "Navbar.login": "Login",
      "Navbar.logout": "Logout",
      "Navbar.search": "Search...",
      "Navbar.dashboard": "Dashboard",
      "siteConfig.name": "MMSH Logistics",
      "siteConfig.description": "MMSH Logistics Web Application"
    },
    ru: {
      "Navbar.home": "Главная",
      "Navbar.blog": "Блог",
      "Navbar.about": "О нас",
      "Navbar.profile": "Профиль",
      "Navbar.login": "Войти",
      "Navbar.logout": "Выйти",
      "Navbar.search": "Поиск...",
      "Navbar.dashboard": "Панель управления",
      "siteConfig.name": "MMSH Logistics",
      "siteConfig.description": "Веб-приложение MMSH Logistics"
    },
    uz: {
      "Navbar.home": "Bosh sahifa",
      "Navbar.blog": "Blog",
      "Navbar.about": "Biz haqimizda",
      "Navbar.profile": "Profil",
      "Navbar.login": "Kirish",
      "Navbar.logout": "Chiqish",
      "Navbar.search": "Qidirish...",
      "Navbar.dashboard": "Boshqaruv paneli",
      "siteConfig.name": "MMSH Logistics",
      "siteConfig.description": "MMSH Logistics veb-ilovasi"
    },
  };

  const t = (key: string) => translations[language]?.[key] || translations.en[key] || key;

  return {
    name: "MMSH",
    description: "MMSH Logistics Web Application",
    navItems: [
      {
        key: "home",
        label: t("Navbar.home"),
        href: "/",
      },
      {
        key: "blog",
        label: t("Navbar.blog"),
        href: "/blog",
      },
      {
        key: "about",
        label: t("Navbar.about"),
        href: "/about",
      },
    ],
    navMenuItems: [
      {
        key: "profile",
        label: t("Navbar.profile"),
        href: "/profile",
      },
      {
        key: "about",
        label: t("Navbar.about"),
        href: "/about",
      },
      {
        key: "blog",
        label: t("Navbar.blog"),
        href: "/blog",
      },
      {
        key: "login",
        label: t("Navbar.login"),
        href: "/authentication",
      },
    ],
    links: {
      github: "https://github.com/heroui-inc/heroui",
      twitter: "https://twitter.com/hero_ui",
      docs: "https://heroui.com",
      discord: "https://discord.gg/9b6yyZKmH4",
      sponsor: "https://patreon.com/jrgarciadev",
    },
  };
};

import { useHydrationSafeLanguage } from '@/hooks/useHydrationSafeLanguage';

// Client-side hook (uses react-i18next)
export const useSiteConfig = () => {
  const language = useHydrationSafeLanguage();
  return getSiteConfig(language);
};
