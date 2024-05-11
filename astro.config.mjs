import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import astroExpressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321/',
  integrations: [
    astroExpressiveCode(),
    starlight({
      title: 'jCanvas',
      components: {
        Head: './src/components/starlight/Head.astro'
      },
      sidebar: [
        { label: 'jCanvas', autogenerate: { directory: 'jCanvas' } },
        { label: 'Canvas', autogenerate: { directory: 'Canvas' } },
        { label: 'Drawing', autogenerate: { directory: 'Drawing' } },
        { label: 'Layers', autogenerate: { directory: 'Layers' } },
        { label: 'Events', autogenerate: { directory: 'Events' } },
        { label: 'Styles', autogenerate: { directory: 'Styles' } }
        // ],
        // },
      ],
      editLink: {
        baseUrl: 'https://github.com/caleb531/jcanvas-website/edit/main'
      },
      defaultLocale: 'en',
      social: {
        github: 'https://github.com/caleb531/jcanvas-website'
      },
      head: [
        // Add ICO favicon fallback for Safari.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: 'assets/images/favicon.ico',
            sizes: '32x32'
          }
        }
      ]
    }),
    mdx()
  ]
});
