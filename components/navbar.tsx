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
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  MMSHLogo,
} from "@/components/icons";
import { FaInstagram, FaTelegram, FaSignInAlt } from "react-icons/fa";
import { SocialMedia } from "./mini_components/Social_media";
import LanguageToggle from "@/components/languages/button";

export const Navbar = () => {
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
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const router = useRouter();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MMSHLogo size={60} />
            <p className="font-bold text-inherit text-xl">MMSH</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
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
          <ThemeSwitch/>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-md text-color-default"
            href="/authentication"
            startContent={<FaSignInAlt className="text-primary" />}
            color="secondary"
            variant="ghost"
            onClick={() => router.push("/authentication")}
          >
            login
          </Button>
          <LanguageToggle/>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          {/* Instagram */}
          <Link isExternal aria-label="Instagram" href="https://www.instagram.com/mmshlogistics?igsh=MW9mbjd0aXB0Y2xpdw==">
                <FaInstagram className="text-default-500 w-5 h-5 hover:text-pink-500 transition" />
            </Link>
          <Link isExternal aria-label="Telegram" href="https://telegram.me/logistikammsh">
            <FaTelegram className="text-default-500 w-5 h-5 hover:text-blue-500 transition" />
          </Link>
          <ThemeSwitch />
          <LanguageToggle/>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === siteConfig.navMenuItems.length - 1
                    ? item.label === "Login"
                      ? "primary"
                      : item.label === "Logout" 
                        ? "danger"
                        : "foreground"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
