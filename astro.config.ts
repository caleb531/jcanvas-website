import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import astroExpressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://projects.calebevans.me',
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
      // Wrap all Expressive Code styles in a @layer with the given name to
      // allow us to override them without struggle (see
      // <https://expressive-code.com/reference/configuration/#cascadelayer>)
      cascadeLayer: 'ec-layer'
    }),
    starlight({
      title: 'jCanvas Documentation',
      components: {
        Head: './src/components/starlight/Head.astro',
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        MarkdownContent: './src/components/starlight/MarkdownContent.astro'
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
  ],
  // jCanvas requires jQuery as a peer dependency for consuming applications
  // (like this website) to install, so this website requires jQuery as a
  // dependency; however the core jCanvas repository also has jQuery installed
  // as a dev dependency for testing; this means that when Vite attempts to
  // resolve jQuery required by jCanvas, it will resolve to the dev dependency
  // instance rather than the website instance of jQuery (i.e. at the parent
  // level); this prevents jCanvas from properly loading on the page, because
  // jCanvas modifies the global on its own installed jQuery rather than the
  // instance of the website's installed jQuery (which is also being imported by
  // the website itself); to solve this, we alias all imports of jquery to the
  // website's installed jQuery, so there is only ever one instance of the
  // jQuery module being imported
  vite: {
    resolve: {
      alias: {
        jquery: 'node_modules/jquery'
      }
    }
  }
});
