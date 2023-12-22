interface GridColumns {
  header: string;
  property: string;
  type: 'text' | 'date' | 'template' | 'link';
}

interface HackerNewsDetails {
  icon: string;
  preposition: string;
  type: string;
  property: string;
}

export interface HackerNews extends GridColumns {
  hasDetails: boolean;
  details?: HackerNewsDetails[];
  isHideSm: boolean;
}

export interface HackerNewsFeed {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

export interface HackerNewsFeedComments {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: HackerNewsFeedComments[];
  marginLeft: string;
}

export interface HackerNewsFeedDetails extends HackerNewsFeed {
  comments: HackerNewsFeedComments[];
}
