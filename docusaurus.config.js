module.exports = {
  title: 'Capitalisk',
  tagline: 'Decentralized free markets',
  url: 'https://your-docusaurus-test-site.com',
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
        alt: 'My Site Logo',
        src: 'img/capitalisk-logo-icon.png',
        srcDark: 'img/logo-white.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'DOCS',
          position: 'left',
          className: 'nav-item',
        },
        {
          to: 'docs/whitepaper',
          label: 'WHITEPAPER',
          position: 'left',
          className: 'nav-item',
        },
        {
          to: 'docs/wallet',
          label: 'WALLET',
          position: 'left',
          className: 'nav-item',
        },
        {
          href: 'https://github.com/Capitalisk',
          label: 'GITHUB',
          position: 'right',
          className: 'nav-item',
        },
        {
          href: 'https://ldex.trading',
          label: 'LDEX',
          position: 'right',
          className: 'nav-item',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/8bJHhvU',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/LeaseholdHQ',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/Leaseholdchat',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/Leasehold/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Capitalisk',
            },
            {
              label: 'Leasehold',
              href: 'https://leasehold.io',
            },
          ],
        },
      ],
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
