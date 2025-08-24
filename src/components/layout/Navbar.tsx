"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useSiteConfig } from "@/config/site"; // ✅ Use the new Hook instead of calling a function
import { ThemeSwitch } from "@/components/theme-switch";
import { useRouter } from "next/navigation";
import { SearchIcon, MMSHLogo } from "@/components/icons";
import { FaInstagram, FaTelegram, FaSignInAlt } from "react-icons/fa";
import { SocialMedia } from "@/components/ui/SocialMedia";
import { useClient } from "@/contexts/profile-management/client-context";
import { User } from "@heroui/react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { t } = useTranslation();
  const siteConfig = useSiteConfig(); // ✅ Now correctly gets translations
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder={t("Navbar.search")}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const { client, getImg } = useClient();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (client && client.Info.Img)
      setAvatarSrc(getImg(client?.Info.Img?.Img64));
  }, [client]);

  // Close mobile menu when navigating
  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper:
          "border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black h-[7vh]",
        menu: "pt-4 pb-6",
        toggle: "text-default-500 hover:text-primary transition-colors",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MMSHLogo size={60} />
            <p className="font-bold text-inherit text-xl">MMSH</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-5 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label} {/* ✅ Now translated properly */}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <SocialMedia />
          <LanguageSwitcher />
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {client && (
          <div className="p-1">
            <User
              avatarProps={{
                size: "sm",
                src:
                  avatarSrc ||
                  "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              name={client?.Info.Name + " " + client?.Info.Surname}
            />
          </div>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          aria-label="Instagram"
          href="https://www.instagram.com/mmshlogistics"
          className="text-default-500 hover:text-pink-500 transition-colors"
        >
          <FaInstagram className="w-5 h-5" />
        </Link>
        <Link
          isExternal
          aria-label="Telegram"
          href="https://telegram.me/logistikammsh"
          className="text-default-500 hover:text-blue-500 transition-colors"
        >
          <FaTelegram className="w-5 h-5" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-default-600 hover:text-primary transition-colors"
        />
      </NavbarContent>

      <NavbarMenu className="pt-4 pb-6">
        {client && (
          <div className="px-4 mb-4">
            <User
              avatarProps={{
                size: "md",
                src:
                  avatarSrc ||
                  "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              name={client?.Info.Name + " " + client?.Info.Surname}
              description={client?.Info.Email}
              className="justify-start"
            />
          </div>
        )}
        
        <div className="px-4 mb-4">
          {searchInput}
        </div>
        
        <div className="flex flex-col gap-1">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.key}-${index}`}>
              <Link
                color={
                  index === siteConfig.navMenuItems.length - 1
                    ? item.label === t("Navbar.login")
                      ? "primary"
                      : item.label === t("Navbar.logout")
                        ? "danger"
                        : "foreground"
                    : "foreground"
                }
                href={item.href}
                size="lg"
                className="w-full py-2 px-4 rounded-lg hover:bg-default-100 transition-colors"
                onPress={() => handleNavigation(item.href)}
              >
                {item.label} {/* ✅ Now translated */}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        
        <div className="mt-auto pt-4 px-4 border-t border-default-200">
          <div className="flex items-center justify-between">
            <LanguageSwitcher />
            <SocialMedia />
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
