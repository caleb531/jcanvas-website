import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode from 'astro-expressive-code';
import starlight from "@astrojs/starlight";
// import { makeLocalesConfig } from './config/locales';
// import { makeSidebar } from './config/sidebar';

const site = 'http://localhost:4321//';


// https://astro.build/config
export default defineConfig({
  	site,
  integrations: [tailwind(),
    astroExpressiveCode(), 
    starlight({
      title: 'jCanvas Documentation',
			// // customCss: ['./src/styles/sass/doc.scss'],
			// // components: {
			// // 	EditLink: './src/components/starlight/EditLink.astro',
			// // 	Head: './src/components/starlight/Head.astro',
			// // 	Hero: './src/components/starlight/Hero.astro',
			// // 	MarkdownContent: './src/components/starlight/MarkdownContent.astro',
			// // 	MobileTableOfContents: './src/components/starlight/MobileTableOfContents.astro',
			// // 	TableOfContents: './src/components/starlight/TableOfContents.astro',
			// // 	PageSidebar: './src/components/starlight/PageSidebar.astro',
			// // 	Pagination: './src/components/starlight/Pagination.astro',
			// // 	SiteTitle: './src/components/starlight/SiteTitle.astro',
			// // 	Search: './src/components/starlight/Search.astro',
			// // 	Sidebar: './src/components/starlight/Sidebar.astro',
			// // 	PageTitle: './src/components/starlight/PageTitle.astro',
			// // },
			// editLink: {
			// 	baseUrl: 'https://github.com/withastro/docs/edit/main',
			// },
			// defaultLocale: 'en',
			// // locales: makeLocalesConfig(),
			// // sidebar: makeSidebar(),
			// social: {
			// 	github: 'https://github.com/withastro/astro',
			// 	discord: 'https://astro.build/chat',
			// },
			// // pagefind: false,
			// head: [
			// 	// Add ICO favicon fallback for Safari.
			// 	{
			// 		tag: 'link',
			// 		attrs: {
			// 			rel: 'icon',
			// 			href: 'assets/images/favicon.ico',
			// 			sizes: '32x32',
			// 		},
			// 	},
			// ],
		}),
    mdx(), 
  ]
});