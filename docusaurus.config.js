// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;
const { resolveSoa } = require('dns');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fame',
  tagline: 'Dinosaurs are cool',
  url: 'https://fame.grigri.cloud',
  trailingSlash: false,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pando85',
  projectName: 'fame',
  deploymentBranch: 'gh-pages',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          path: 'recetas',
          routeBasePath: '/',
          blogTitle: 'Fame',
          blogDescription: 'Archivo de recetas de cocina, ñam ñam.',
          showReadingTime: false,
          blogSidebarCount: 0,
          postsPerPage: 'ALL',
          feedOptions: {
            type: 'rss',
          },
          editUrl:
            'https://github.com/pando85/fame/tree/main/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: 'keywords', content: 'fame, comida' }
      ],
      navbar: {
        hideOnScroll: true,
        title: 'Fame',
        logo: {
          alt: 'Fame',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/pando85/fame',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `<span class="copyleft">©</span> ${new Date().getFullYear()}. All Rights Reversed.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
