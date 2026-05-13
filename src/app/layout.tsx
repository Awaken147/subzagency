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
  title: "SubzAgency | Cinematic 3D Websites That Sell",
  description:
    "SubzAgency builds ultra-premium cinematic 3D websites for gyms, hotels, cafes, restaurants, ecommerce stores, and businesses. Based in Gangtok, Sikkim, India. Futuristic web design with smooth animations, interactive 3D experiences, and AI-powered solutions.",
  keywords: [
    "SubzAgency",
    "3D websites",
    "cinematic web design",
    "Gangtok",
    "Sikkim",
    "India",
    "web development",
    "UI/UX design",
    "Three.js",
    "premium websites",
    "creative agency",
    "futuristic design",
    "AI chatbot",
    "ecommerce",
    "landing page",
  ],
  authors: [{ name: "SubzAgency" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SubzAgency | Cinematic 3D Websites That Sell",
    description:
      "Ultra-premium cinematic 3D websites for businesses. Futuristic, interactive, and conversion-focused.",
    siteName: "SubzAgency",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubzAgency | Cinematic 3D Websites That Sell",
    description:
      "Ultra-premium cinematic 3D websites for businesses. Futuristic, interactive, and conversion-focused.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
              "@type": "Organization",
              name: "SubzAgency",
              description:
                "Ultra-premium cinematic 3D website development agency",
              url: "https://subzagency.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gangtok",
                addressRegion: "Sikkim",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-6297097642",
                contactType: "sales",
              },
              sameAs: ["https://instagram.com/subz_agency"],
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
