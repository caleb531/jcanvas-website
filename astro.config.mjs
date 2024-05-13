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
      themes: ['github-dark'],
      frames: {
        // Disable "Copy to Clipboard" button on each code block for the time
        // being, since it gets in the way of the "Try in Sandbox" button
        showCopyToClipboardButton: false
      },
      // Wrap all Expressive Code styles in a @layer with the given name to allow us to override
      // them without struggle (see
      // <https://expressive-code.com/reference/configuration/#cascadelayer>)
      cascadeLayer: 'ec-layer'
    }),
    starlight({
      title: 'jCanvas Documentation',
      components: {
        Head: './src/components/starlight/Head.astro',
        Header: './src/components/starlight/Header.astro'
      },
      customCss: ['./src/assets/styles/docs.scss'],
      sidebar: [
        { label: 'jCanvas', autogenerate: { directory: 'jCanvas' } },
        { label: 'Canvas', autogenerate: { directory: 'Canvas' } },
        { label: 'Drawing', autogenerate: { directory: 'Drawing' } },
        { label: 'Layers', autogenerate: { directory: 'Layers' } },
        { label: 'Events', autogenerate: { directory: 'Events' } },
        { label: 'Styles', autogenerate: { directory: 'Styles' } },
        { label: 'Plugins', autogenerate: { directory: 'Plugins' } }
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
