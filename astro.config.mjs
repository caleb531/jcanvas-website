import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import astroExpressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321/',
  base: '/jcanvas/',
  integrations: [
    astroExpressiveCode({
      // Available Themes: <https://expressive-code.com/guides/themes/>
      themes: ['github-dark']
    }),
    starlight({
      title: 'jCanvas Documentation',
      components: {
        Head: './src/components/starlight/Head.astro'
      },
      customCss: ['./src/assets/styles/docs.scss'],
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
      favicon: '/assets/images/favicon.png'
    }),
    mdx()
  ]
});
