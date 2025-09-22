// next.config.mjs
const isProd = process.env.NODE_ENV === "production";
const repo = "wedding-site"; // <-- replace with your repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",              // writes static to /out
  images: { unoptimized: true }, // if you ever use next/image
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};
export default nextConfig;
