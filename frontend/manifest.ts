import { VitePWAOptions } from "vite-plugin-pwa";

export const Manifest: Partial<VitePWAOptions> = {
  injectRegister: "auto",
  manifest: {
    name: "Http request App",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    short_name: "Httprequest",
    description: "Http request",
    icons: [
      {
        src: "android_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android_512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "apple-touch.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
