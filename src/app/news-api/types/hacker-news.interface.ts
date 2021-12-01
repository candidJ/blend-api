export interface IGridColumnsDef {
  header: string;
  property: string;
  type: "text" | "date" | "template" | "link";
}

export interface HackerNewsDetails {
  icon: string;
  preposition: string;
  type: string;
  property: string;
}

export interface HackerNews extends IGridColumnsDef {
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

export interface HNComments {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: HNComments[];
  marginLeft: string;
}

export interface HackerNewsFeedDetails extends HackerNewsFeed {
  comments: HNComments[];
}
