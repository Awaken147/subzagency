import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SubzAgency — Cinematic 3D Websites That Sell",
    short_name: "SubzAgency",
    description:
      "Ultra-premium cinematic 3D websites for businesses. Based in Gangtok, Sikkim, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#7c3aed",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/android-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/android-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
