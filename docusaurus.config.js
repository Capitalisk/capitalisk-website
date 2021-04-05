module.exports = {
  title: 'Capitalisk',
  tagline: 'Decentralized free markets',
  url: 'https://capitalisk.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Capitalisk', // Usually your GitHub org/user name.
  projectName: 'capitalisk-site', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Capitalisk',
      logo: {
        alt: 'Capitalisk Logo',
        src: 'img/capitalisk-logo-icon.png',
        srcDark: 'img/logo-white.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'DOCS',
          position: 'right',
          className: 'nav-item',
        },
        {
          to: 'whitepaper',
          label: 'WHITEPAPER',
          position: 'right',
          className: 'nav-item',
        },
        // {
        //   to: 'blog/',
        //   activeBasePath: 'blog',
        //   label: 'BLOG',
        //   position: 'right',
        //   className: 'nav-item',
        // },
        {
          to: 'wallet',
          label: 'WALLET',
          position: 'right',
          className: 'external-nav-item',
        },
        {
          href: 'https://ldex.trading',
          label: 'LDEX',
          position: 'right',
          className: 'external-nav-item',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Wallet',
              to: 'wallet/',
            },
            {
              label: 'Exchange',
              to: 'https://ldex.trading',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
            {
              label: 'Github',
              to: 'https://github.com/Capitalisk',
            },
            {
              label: 'Whitepaper',
              to: 'whitepaper/'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/capitalisk',
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/8rMacvN9',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CapitaliskHQ',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/Capitalisk',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/Capitalisk/',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'FAQ\'s',
              to: 'wallet/',
            }
          ],
        },
      ],
      logo: {
        alt: 'Capitalisk',
        src: 'img/logo-grey.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Capitalisk.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
