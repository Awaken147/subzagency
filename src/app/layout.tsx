import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://subzagency.online"),
  title: {
    default: "SubzAgency — Premium 3D Website Design & AI Automation | Gangtok, Sikkim",
    template: "%s | SubzAgency — Premium Web Design Gangtok",
  },
  description:
    "SubzAgency is a premium web design agency in Gangtok, Sikkim, India specializing in cinematic 3D websites, AI automation, and conversion-focused digital experiences. We build with Three.js, Next.js, and immersive animations for businesses across India.",
  keywords: [
    "SubzAgency",
    "Subz Agency",
    "web design agency Gangtok",
    "web design agency Sikkim",
    "3D website design",
    "cinematic web design",
    "AI automation agency",
    "3D web development",
    "premium website design India",
    "Next.js web agency",
    "Three.js website",
    "interactive website design",
    "conversion-focused websites",
    "immersive web experiences",
    "web design Gangtok",
    "web design Sikkim",
    "website developer Gangtok",
    "web agency Northeast India",
    "digital agency Sikkim",
    "website design India",
    "gym website design",
    "hotel website design",
    "cafe website design",
    "restaurant website design",
    "ecommerce website development",
    "landing page design",
    "React Three Fiber",
    "Three.js development",
    "Next.js development",
    "AI chatbot integration",
    "futuristic web design",
    "creative agency India",
    "SEO services Gangtok",
    "SEO optimization Sikkim",
    "local SEO India",
  ],
  authors: [{ name: "SubzAgency", url: "https://subzagency.online" }],
  creator: "SubzAgency",
  publisher: "SubzAgency",
  applicationName: "SubzAgency",
  alternates: {
    canonical: "https://subzagency.online",
    types: {
      "application/rss+xml": "https://subzagency.online/rss.xml",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "SubzAgency — Premium 3D Website Design & AI Automation",
    description:
      "Ultra-premium cinematic 3D websites and AI automation for businesses. Based in Gangtok, Sikkim, India. Futuristic, interactive, and conversion-focused web design.",
    url: "https://subzagency.online",
    siteName: "SubzAgency",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://subzagency.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubzAgency — Premium 3D Website Design & AI Automation in Gangtok, Sikkim",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubzAgency — Premium 3D Website Design & AI Automation",
    description:
      "Ultra-premium cinematic 3D websites and AI automation for businesses. Futuristic, interactive, and conversion-focused.",
    images: ["https://subzagency.online/og-image.png"],
    creator: "@subzagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  verification: {
    google: "google-site-verification-code-here",
  },
  other: {
    "instagram:site": "@subz_agency",
    "apple-itunes-app": "app-id=subzagency",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://subzagency.online/#organization",
      name: "SubzAgency",
      description:
        "Ultra-premium cinematic 3D website development agency in Gangtok, Sikkim, India specializing in AI automation and immersive digital experiences.",
      url: "https://subzagency.online",
      logo: {
        "@type": "ImageObject",
        url: "https://subzagency.online/icon.png",
      },
      email: "subzagency99@gmail.com",
      telephone: "+91-6297097642",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gangtok",
        addressLocality: "Gangtok",
        addressRegion: "Sikkim",
        postalCode: "737101",
        addressCountry: "IN",
      },
      sameAs: [
        "https://instagram.com/subz_agency",
        "https://wa.me/916297097642",
      ],
      foundingLocation: {
        "@type": "Place",
        name: "Gangtok, Sikkim, India",
      },
      foundingDate: "2024",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 10,
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      knowsAbout: [
        "3D Website Design",
        "AI Automation",
        "Cinematic Web Development",
        "Next.js Development",
        "Three.js Development",
        "SEO Optimization",
      ],
      slogan: "Cinematic 3D Websites That Sell",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://subzagency.online/#localbusiness",
      name: "SubzAgency",
      description:
        "Premium 3D website development agency specializing in cinematic web experiences, AI automation, and conversion-focused digital design.",
      url: "https://subzagency.online",
      telephone: "+91-6297097642",
      email: "subzagency99@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gangtok",
        addressLocality: "Gangtok",
        addressRegion: "Sikkim",
        postalCode: "737101",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.3389,
        longitude: 88.6065,
      },
      priceRange: "₹9,999 - ₹89,999+",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      currenciesAccepted: "INR",
      paymentAccepted: "UPI, Bank Transfer",
      sameAs: [
        "https://instagram.com/subz_agency",
        "https://wa.me/916297097642",
      ],
      image: "https://subzagency.online/og-image.png",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Design & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starter Website Package",
              description:
                "Professional landing page with responsive design, basic animations, and SEO optimization. Perfect for small businesses starting their online presence.",
            },
            price: "9999",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Website Package",
              description:
                "Multi-page website with 3D elements, contact forms, and enhanced SEO. Ideal for growing businesses that need a strong digital presence.",
            },
            price: "24999",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Premium 3D Website Package",
              description:
                "Cinematic 3D website with immersive animations, Three.js integration, AI chatbot, and advanced SEO. For brands that want to stand out.",
            },
            price: "49999",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ecommerce Website Package",
              description:
                "Full-featured online store with product management, payment integration, 3D product showcases, and AI-powered recommendations.",
            },
            price: "69999",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Custom Package",
              description:
                "Bespoke cinematic web experience with custom 3D worlds, advanced AI automation, real-time features, and dedicated support. Fully customized to your vision.",
            },
            price: "89999",
            priceCurrency: "INR",
          },
        ],
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://subzagency.online/#website",
      url: "https://subzagency.online",
      name: "SubzAgency",
      publisher: {
        "@id": "https://subzagency.online/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://subzagency.online/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://subzagency.online/#webpage",
      url: "https://subzagency.online",
      name: "SubzAgency — Premium 3D Website Design & AI Automation | Gangtok, Sikkim",
      description:
        "SubzAgency is a premium web design agency in Gangtok, Sikkim, India specializing in cinematic 3D websites, AI automation, and conversion-focused digital experiences.",
      isPartOf: {
        "@id": "https://subzagency.online/#website",
      },
      about: {
        "@id": "https://subzagency.online/#organization",
      },
      datePublished: "2024-01-01T00:00:00+05:30",
      dateModified: new Date().toISOString(),
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://subzagency.online/og-image.png",
      },
    },
    {
      "@type": "Service",
      "@id": "https://subzagency.online/#service-3d-website-design",
      name: "3D Website Design",
      description:
        "Ultra-premium 3D website design with cinematic animations, interactive 3D elements, and immersive user experiences. Built with Three.js and React Three Fiber for businesses that want to stand out.",
      provider: {
        "@id": "https://subzagency.online/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      serviceType: "3D Website Design",
    },
    {
      "@type": "Service",
      "@id": "https://subzagency.online/#service-ai-automation",
      name: "AI Automation & Chatbot Integration",
      description:
        "Custom AI chatbot integration powered by GPT for automated customer support, lead generation, and business process automation. Enhance your website with intelligent conversational AI.",
      provider: {
        "@id": "https://subzagency.online/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      serviceType: "AI Automation & Chatbot Integration",
    },
    {
      "@type": "Service",
      "@id": "https://subzagency.online/#service-cinematic-web-development",
      name: "Cinematic Web Development",
      description:
        "Cinematic web development with scroll-driven animations, parallax effects, video backgrounds, and immersive storytelling. We create web experiences that captivate and convert visitors.",
      provider: {
        "@id": "https://subzagency.online/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      serviceType: "Cinematic Web Development",
    },
    {
      "@type": "Service",
      "@id": "https://subzagency.online/#service-seo-optimization",
      name: "SEO Optimization",
      description:
        "Comprehensive SEO optimization including on-page SEO, technical SEO, local SEO, and content strategy. Improve your search engine rankings and drive organic traffic to your website.",
      provider: {
        "@id": "https://subzagency.online/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      serviceType: "SEO Optimization",
    },
    {
      "@type": "Service",
      "@id": "https://subzagency.online/#service-ecommerce-development",
      name: "Ecommerce Development",
      description:
        "Full-featured ecommerce website development with product management, secure payment integration, 3D product showcases, inventory tracking, and AI-powered product recommendations.",
      provider: {
        "@id": "https://subzagency.online/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Sikkim" },
        { "@type": "City", name: "Gangtok" },
      ],
      serviceType: "Ecommerce Development",
    },
    {
      "@type": "FAQPage",
      "@id": "https://subzagency.online/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to build a 3D website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A standard 3D website takes 7-21 business days depending on complexity. Landing pages can be delivered in as little as 5 days, while full cinematic 3D experiences with custom animations may take 3-4 weeks. We provide a detailed timeline during our initial consultation.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer hosting and maintenance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide premium hosting with 99.9% uptime guarantee and regular maintenance packages. Our hosting includes SSL certificates, CDN delivery, daily backups, security monitoring, and performance optimization to ensure your website runs at peak speed.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies do you use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build with Next.js, React Three Fiber, Three.js, Tailwind CSS, and Framer Motion for the frontend. For AI features, we integrate GPT-powered chatbots and automation tools. Our stack ensures blazing-fast performance, stunning 3D visuals, and SEO-optimized websites.",
          },
        },
        {
          "@type": "Question",
          name: "Can I see my website progress during development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide regular updates and preview links throughout the development process. You will receive milestone previews at key stages — design mockup approval, initial build review, 3D element testing, and final QA. We believe in full transparency and collaborative development.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer AI chatbot integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we integrate custom AI chatbots powered by GPT that can handle customer inquiries, qualify leads, schedule appointments, and provide 24/7 support. Our chatbots are trained on your business data and can be customized to match your brand voice and tone.",
          },
        },
        {
          "@type": "Question",
          name: "What is the payment process?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept UPI and bank transfer. Payment is collected before development begins. For larger projects, we offer a two-part payment plan: 50% upfront and 50% upon completion. All pricing is transparent with no hidden fees — you will receive a detailed proposal before any payment is required.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subzagency.online/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://subzagency.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "SubzAgency",
          item: "https://subzagency.online",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Author link for SEO */}
        <link rel="author" href="https://subzagency.online" />

        {/* Instagram social profile for Google Knowledge Graph */}
        <meta name="instagram:site" content="@subz_agency" />
        <link rel="me" href="https://instagram.com/subz_agency" />

        {/* Structured Data — JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
