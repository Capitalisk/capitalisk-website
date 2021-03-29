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
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Guide',
          position: 'left',
        },
        {to: 'docs/timeline', label: 'Timeline', position: 'left'},
        {to: 'docs/whitepaper', label: 'Whitepaper', position: 'left'},
        {to: 'docs/ito', label: 'ITO', position: 'left'},
        {to: 'docs/wallet', label: 'Wallet', position: 'left'},
        {href: 'https://explorer.capitalisk.com', label: 'Explorer', position: 'right'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
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
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
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
              href: 'https://www.reddit.com/r/Leasehold/'
            }
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
              href: 'https://github.com/leasehold',
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
