import { LogoLink, NavbarMenu } from '../types/navbar.interface';

export const LOGO_WITH_LINK: LogoLink = {
  logo: '../../assets/images/blend-api-logo.png',
  routerLink: '/hacker-news',
};

export const NAVBAR_MENU_ITEMS: Array<NavbarMenu> = [
  {
    title: 'Hacker News',
    icon: 'book-open',
    routerLink: '/hacker-news',
    hasSubMenu: true,
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
    hasSubMenu: false,
    icon: 'file-text',
    routerLink: '/quotes',
    // Uncomment to include multiple quotes API
    // subMenu: [
    //   {
    //     title: 'Programming',
    //     hasSubMenu: false,
    //     icon: '',
    //     routerLink: 'programming',
    //   },
    //   {
    //     title: 'Life',
    //     hasSubMenu: false,
    //     icon: '',
    //     routerLink: 'life',
    //   },
    // ],
  },
  {
    title: 'Weather',
    hasSubMenu: false,
    icon: 'cloud-lightning',
    routerLink: '/weather',
  },
  {
    title: 'Calculator',
    hasSubMenu: false,
    icon: 'cpu',
    routerLink: '/calculator',
  },
];
