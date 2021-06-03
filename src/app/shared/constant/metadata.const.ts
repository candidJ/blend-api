import { HackerNews } from '../interface/interface';
import { AppConfig } from './config';

// Hacker News Feed columns
export const HNFeedColumns: HackerNews[] = [
    {
        header: 'Title',
        property: 'title',
        type: 'text',
        hasDetails: true,
        isHideSm: false,
        details: [
            {
                property: 'points',
                type: 'text',
                preposition: 'points',
                icon: 'thumbs-up'
            },
            {
                property: 'user',
                type: 'text',
                preposition: 'by',
                icon: 'user'
            },
            {
                property: 'time_ago',
                type: 'text',
                preposition: '',
                icon: 'watch'
            },
            {
                property: 'comments_count',
                type: 'text',
                preposition: 'comment',
                icon: 'message-square'
            }
        ]
    },
    {
        header: 'Domain',
        property: 'domain',
        type: 'link',
        hasDetails: false,
        isHideSm: true
    },
    {
        header: 'View',
        property: 'actions',
        type: 'template',
        hasDetails: false,
        isHideSm: false
    }
];

// Navbar config
export const NavbarMenuItems = {
    logo: AppConfig.IMAGES.LOGO,
    routerLink: "/quotes",
    navbarMenu: [
        {
            title: "Quotes",
            hasSubMenu: true,
            icon: "file-text",
            routerLink: "/quotes",
            subMenu: [{
                icon: "",
                title: "Programming",
                hasSubMenu: false,
                routerLink: "programming"
            }, {
                icon: "",
                title: "Life",
                hasSubMenu: false,
                routerLink: "life"
            }]
        },
        {
            title: "Weather",
            hasSubMenu: false,
            icon: "cloud-lightning",
            routerLink: "/weather"
        },

        // NEWS API org api only works in Developer mode. Uncomment to access when running locally.
        // {
        //   title: "News",
        //   hasSubMenu: false,
        //   icon: "file-text",
        //   routerLink: "/news"
        // },
        {
            title: "Hacker News",
            hasSubMenu: true,
            icon: "book-open",
            routerLink: "/news",
            subMenu: [
                {
                    title: "Feed",
                    routerLink: "feed",
                    icon: "",
                    hasSubMenu: false
                },
                {
                    title: "Latest",
                    routerLink: "latest",
                    icon: "",
                    hasSubMenu: false
                },
                {
                    title: "Jobs",
                    routerLink: "jobs",
                    icon: "",
                    hasSubMenu: false
                },
                {
                    title: "Ask",
                    routerLink: "ask",
                    icon: "",
                    hasSubMenu: false
                },
                {
                    title: "Show",
                    routerLink: "show",
                    icon: "",
                    hasSubMenu: false
                }
            ]
        },
        {
            title: "Calculator",
            hasSubMenu: false,
            icon: "plus-square",
            routerLink: "/calculator"
        }
    ]
};