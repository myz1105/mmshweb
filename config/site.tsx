"use client";
import { useTranslation } from "react-i18next";

export const useSiteConfig = () => {
  const { t } = useTranslation(); // ✅ Use inside a hook

  return {
    name: "MMSH",
    description: "MMSH Logistics Web Application",
    navItems: [
      {
        key: "home",
        label: t("Navbar.home"), // ✅ Proper translation key
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
