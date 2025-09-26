/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "uz"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  // You can add more configuration options here as needed
};
