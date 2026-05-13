import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SubzAgency | Cinematic 3D Websites That Sell — Premium Web Design Gangtok, Sikkim",
  description:
    "SubzAgency is a premium 3D web agency in Gangtok, Sikkim, India. We build cinematic websites with Three.js, Next.js, and immersive animations for gyms, hotels, cafes, restaurants, ecommerce stores, and businesses. Futuristic web design, AI chatbot integration, and conversion-focused digital experiences.",
  keywords: [
    "3D Web Agency in Sikkim",
    "Cinematic Website Design India",
    "3D Website Development",
    "Premium Website Agency",
    "Next.js Web Agency",
    "Web Design Gangtok",
    "Modern Business Websites",
    "SubzAgency",
    "3D websites",
    "cinematic web design",
    "Gangtok",
    "Sikkim",
    "India",
    "web development agency",
    "UI/UX design",
    "Three.js",
    "premium websites",
    "creative agency",
    "futuristic design",
    "AI chatbot integration",
    "ecommerce development",
    "landing page design",
    "React Three Fiber",
    "interactive websites",
    "business website design",
    "gym website design",
    "hotel website design",
    "cafe website design",
    "restaurant website",
  ],
  authors: [{ name: "SubzAgency", url: "https://subzagency.com" }],
  creator: "SubzAgency",
  publisher: "SubzAgency",
  metadataBase: new URL("https://subzagency.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "SubzAgency | Cinematic 3D Websites That Sell",
    description:
      "Ultra-premium cinematic 3D websites for businesses. Based in Gangtok, Sikkim, India. Futuristic, interactive, and conversion-focused web design.",
    url: "https://subzagency.com",
    siteName: "SubzAgency",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubzAgency — Cinematic 3D Websites That Sell",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubzAgency | Cinematic 3D Websites That Sell",
    description:
      "Ultra-premium cinematic 3D websites for businesses. Futuristic, interactive, and conversion-focused.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://subzagency.com/#organization",
                  name: "SubzAgency",
                  description:
                    "Ultra-premium cinematic 3D website development agency in Gangtok, Sikkim, India",
                  url: "https://subzagency.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://subzagency.com/logo.svg",
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
                  sameAs: ["https://instagram.com/subz_agency"],
                  foundingLocation: {
                    "@type": "Place",
                    name: "Gangtok, Sikkim, India",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://subzagency.com/#localbusiness",
                  name: "SubzAgency",
                  description:
                    "Premium 3D website development agency specializing in cinematic web experiences",
                  url: "https://subzagency.com",
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
                  sameAs: ["https://instagram.com/subz_agency"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://subzagency.com/#website",
                  url: "https://subzagency.com",
                  name: "SubzAgency",
                  publisher: {
                    "@id": "https://subzagency.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://subzagency.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://subzagency.com/#webpage",
                  url: "https://subzagency.com",
                  name: "SubzAgency — Cinematic 3D Websites That Sell",
                  isPartOf: {
                    "@id": "https://subzagency.com/#website",
                  },
                  about: {
                    "@id": "https://subzagency.com/#organization",
                  },
                  description:
                    "Premium 3D website development agency in Gangtok, Sikkim. We build cinematic websites with Three.js, Next.js, and immersive animations.",
                },
              ],
            }),
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
