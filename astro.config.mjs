import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import astroExpressiveCode from 'astro-expressive-code';
import starlight from "@astrojs/starlight";

const site = 'http://localhost:4321//';


// https://astro.build/config
export default defineConfig({
  	site,
  integrations: [
    astroExpressiveCode(), 
    starlight({
      title: 'jCanvas Documentation',
			// customCss: ['./src/styles/sass/doc.scss'],
			sidebar: [
				{
				label: 'Documentation',
				// Autogenerate a group of links for the 'constellations' directory.
				autogenerate: { directory: 'docs' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/caleb531/jcanvas-website/edit/main',
			},
			defaultLocale: 'en',
			social: {
				github: 'https://github.com/caleb531/jcanvas-website',
			},
			pagefind: false,
			head: [
				// Add ICO favicon fallback for Safari.
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: 'assets/images/favicon.ico',
						sizes: '32x32',
					},
				},
			],
		}),
    mdx(), 
  ]
});