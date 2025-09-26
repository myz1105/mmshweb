import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/:locale/models/:path*",
        destination: "/models/:path*",
      },
      {
        source: "/models/:path*",
        destination: "/models/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
