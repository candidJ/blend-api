import { HackerNewsConfig, HackerNewsTableColumn } from '../types';

export const HackerNewsFeedColumns: HackerNewsTableColumn[] = [
  {
    header: 'Title',
    property: 'title',
    type: 'text',
    hasDetails: true,
    isHiddenOnSmallScreen: false,
    details: [
      {
        property: 'points',
        type: 'text',
        preposition: 'points',
        icon: 'thumbs-up',
      },
      {
        property: 'user',
        type: 'text',
        preposition: 'by',
        icon: 'user',
      },
      {
        property: 'time_ago',
        type: 'text',
        preposition: '',
        icon: 'watch',
      },
      {
        property: 'comments_count',
        type: 'text',
        preposition: 'comment',
        icon: 'message-square',
      },
    ],
  },
  {
    header: 'Domain',
    property: 'domain',
    type: 'link',
    hasDetails: false,
    isHiddenOnSmallScreen: true,
  },
  {
    header: 'View',
    property: 'actions',
    type: 'template',
    hasDetails: false,
    isHiddenOnSmallScreen: false,
  },
];

export const HACKER_NEWS_URL = 'https://news.ycombinator.com/';

export const HACKER_NEWS_BASE_URL = 'https://api.hackerwebapp.com/';

export const HACKER_NEWS_CONFIG: HackerNewsConfig = {
  feed: {
    URL: 'news',
    TOTAL_RECORDS: 180,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 6,
  },
  jobs: {
    URL: 'jobs',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  },
  latest: {
    URL: 'newest',
    TOTAL_RECORDS: 120,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 4,
  },
  show: {
    URL: 'show',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  },
  ask: {
    URL: 'ask',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  },
};
