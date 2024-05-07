import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import astroExpressiveCode from 'astro-expressive-code';
import starlight from "@astrojs/starlight";

const site = 'http://localhost:4321/';


// https://astro.build/config
export default defineConfig({
  	site,
  integrations: [
    astroExpressiveCode(), 
    starlight({
            title: 'jCanvas',
			  sidebar: [
				{
				label: 'Home',
				items: [
					{ label: 'jCanvas',
      autogenerate: { directory: 'jCanvas' } },
					{ label: 'Canvas',
      autogenerate: { directory: 'Canvas' } },
					{ label: 'Drawing',
      autogenerate: { directory: 'Drawing' } },
					{ label: 'Layers',
      autogenerate: { directory: 'Layers' }},
					{ label: 'Events',
      autogenerate: { directory: 'Events' } },
					{ label: 'Styles',
      autogenerate: { directory: 'Styles' } },
				],
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