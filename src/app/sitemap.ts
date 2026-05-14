import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://subzagency.online";
  const now = new Date();

  // Static lastModified dates representing the last meaningful content update
  const dates = {
    homepage: new Date("2025-03-01"),
    about: new Date("2025-02-15"),
    services: new Date("2025-03-01"),
    projects: new Date("2025-03-04"),
    pricing: new Date("2025-02-28"),
    testimonials: new Date("2025-02-20"),
    faq: new Date("2025-02-10"),
    contact: new Date("2025-02-15"),
    hosting: new Date("2025-02-25"),
  };

  return [
    {
      url: baseUrl,
      lastModified: dates.homepage,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: dates.about,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: dates.services,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: dates.projects,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: dates.pricing,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: dates.testimonials,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: dates.faq,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: dates.contact,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hosting`,
      lastModified: dates.hosting,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
