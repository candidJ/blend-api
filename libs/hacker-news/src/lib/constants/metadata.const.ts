import { HackerNewsTableColumn } from '../types';

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

export const HACKER_NEWS = 'https://news.ycombinator.com/';
