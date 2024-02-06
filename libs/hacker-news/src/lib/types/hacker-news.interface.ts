interface TableColumn {
  header: string;
  property: string;
  type: 'text' | 'date' | 'template' | 'link';
}

export interface HackerNewsTableColumn extends TableColumn {
  hasDetails: boolean;
  details?: HackerNewsItemDetails[];
  isHiddenOnSmallScreen: boolean;
}

interface HackerNewsItemDetails {
  icon: string;
  preposition: string;
  type: string;
  property: string;
}

export interface HackerNewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  url: string;
  domain?: string;
}

export interface HackerNewsItemComment {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: HackerNewsItemComment[];
}

export interface HackerNewsItemWithComments extends HackerNewsItem {
  comments: HackerNewsItemComment[];
}

export type ConfigType = 'jobs' | 'feed' | 'show' | 'ask' | 'latest';

export interface ConfigProps {
  URL: string;
  TOTAL_RECORDS: number;
  PAGE_SIZE: number;
  NO_OF_PAGES: number;
}

export type HackerNewsConfig = {
  [k in ConfigType]: ConfigProps;
};
