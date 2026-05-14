import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
        crawlDelay: 5,
      },
    ],
    sitemap: [
      "https://subzagency.online/sitemap.xml",
    ],
    host: "https://subzagency.online",
  };
}
