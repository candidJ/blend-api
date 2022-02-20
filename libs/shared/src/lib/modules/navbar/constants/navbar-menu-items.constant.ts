import { AppConfig } from '../../../constant';

// Navbar config
export const NavbarMenuItems = {
  logo: AppConfig.IMAGES.LOGO,
  routerLink: '/quotes',
  navbarMenu: [
    {
      title: 'Hacker News',
      hasSubMenu: true,
      icon: 'book-open',
      routerLink: '/hacker-news',
      subMenu: [
        {
          title: 'Feed',
          routerLink: 'feed',
          icon: '',
          hasSubMenu: false,
        },
        {
          title: 'Latest',
          routerLink: 'latest',
          icon: '',
          hasSubMenu: false,
        },
        {
          title: 'Jobs',
          routerLink: 'jobs',
          icon: '',
          hasSubMenu: false,
        },
        {
          title: 'Ask',
          routerLink: 'ask',
          icon: '',
          hasSubMenu: false,
        },
        {
          title: 'Show',
          routerLink: 'show',
          icon: '',
          hasSubMenu: false,
        },
      ],
    },
    {
      title: 'Quotes',
      hasSubMenu: true,
      icon: 'file-text',
      routerLink: '/quotes',
      subMenu: [
        {
          icon: '',
          title: 'Programming',
          hasSubMenu: false,
          routerLink: 'programming',
        },
        {
          icon: '',
          title: 'Life',
          hasSubMenu: false,
          routerLink: 'life',
        },
      ],
    },
    {
      title: 'Weather',
      hasSubMenu: false,
      icon: 'cloud-lightning',
      routerLink: '/weather',
    },

    // NEWS API org api only works in Developer mode. Uncomment to access when running locally.
    // {
    //   title: "News",
    //   hasSubMenu: false,
    //   icon: "file-text",
    //   routerLink: "/news"
    // },
    {
      title: 'Calculator',
      hasSubMenu: false,
      icon: 'cpu',
      routerLink: '/calculator',
    },
  ],
};
