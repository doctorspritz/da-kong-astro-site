import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import compress from "@playform/compress";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://stellar.cosmicthemes.com",
	adapter: netlify({
		imageCDN: false,
	}),
	redirects: {
		"/admin": "/keystatic",
	},
    markdown: {
		shikiConfig: {
			// Shiki Themes: https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: "dracula",
			wrap: true,
		},
	},
	integrations: [
		// example auto import component into mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/Admonition/Admonition.astro",
			],
		}),
		mdx(),
		react(),
		icon(),
		keystatic(),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: false, // enabling this can cause issues
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
	],

    vite: {
        plugins: [tailwindcss()],
        resolve: {
            // Ensure singletons across app and Keystatic UI
            dedupe: [
                'react',
                'react-dom',
                '@keystar/ui',
                '@react-aria/utils',
                '@react-aria/focus',
                '@react-aria/overlays',
                '@react-aria/interactions',
                '@react-stately/overlays',
                '@react-stately/utils',
            ],
        },
        // stop inlining short scripts to fix issues with ClientRouter
        build: {
            assetsInlineLimit: 0,
        },
    },
});
