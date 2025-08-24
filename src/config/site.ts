import { useTranslation } from "react-i18next";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavMenuItem {
  key: string;
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  navItems: NavItem[];
  navMenuItems: NavMenuItem[];
  footerLinks: FooterLink[];
  companyName: string;
  links?: {
    github: string;
    twitter: string;
    docs: string;
    discord: string;
    sponsor: string;
    linkedin: string;
    email: string;
  };
}

export const useSiteConfig = (): SiteConfig => {
  const { t } = useTranslation();

  return {
    navItems: [
      {
        label: t("Navbar.home"),
        href: "/",
      },
      {
        label: t("Navbar.services"),
        href: "/services",
      },
      {
        label: t("Navbar.about"),
        href: "/about",
      },
      {
        label: t("Navbar.contact"),
        href: "/contact",
      },
    ],
    navMenuItems: [
      {
        key: "home",
        label: t("Navbar.home"),
        href: "/",
      },
      {
        key: "services",
        label: t("Navbar.services"),
        href: "/services",
      },
      {
        key: "about",
        label: t("Navbar.about"),
        href: "/about",
      },
      {
        key: "contact",
        label: t("Navbar.contact"),
        href: "/contact",
      },
      {
        key: "login",
        label: t("Navbar.login"),
        href: "/login",
      },
    ],
    footerLinks: [
      {
        label: t("Footer.privacy"),
        href: "/privacy",
      },
      {
        label: t("Footer.terms"),
        href: "/terms",
      },
      {
        label: t("Footer.contact"),
        href: "/contact",
      },
    ],
    companyName: t("siteConfig.name"),
    links: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      docs: "https://docs.example.com",
      discord: "https://discord.gg/example",
      sponsor: "https://github.com/sponsors/example",
      linkedin: "https://linkedin.com",
      email: "mailto:contact@example.com",
    },
  };
};
