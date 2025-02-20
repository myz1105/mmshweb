export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MMSH",
  description: "MMSH Logistics Web Application",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Login",
      href: "/authentication",
    },
    // {
    //   label: "Logout",
    //   href: "/logout",
    // },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
