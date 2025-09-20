import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "at-02-2",
                short_name: "at-02-2",
                description: "An app to communicate within the air force batch",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "/192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});
