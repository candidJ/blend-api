interface GridColumns {
  header: string;
  property: string;
  type: 'text' | 'date' | 'template' | 'link';
}

export interface HackerNewsGridColumns extends GridColumns {
  hasDetails: boolean;
  details?: HackerNewsDetails[];
  isHideSm: boolean;
}

interface HackerNewsDetails {
  icon: string;
  preposition: string;
  type: string;
  property: string;
}
export interface HackerNewsFeed {
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

export interface HackerNewsFeedComments {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: HackerNewsFeedComments[];
}

export interface HackerNewsFeedDetails extends HackerNewsFeed {
  comments: HackerNewsFeedComments[];
}
