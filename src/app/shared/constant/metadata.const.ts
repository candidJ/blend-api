import { HackerNews } from "src/app/news-api/types/hacker-news.interface";

// Hacker News Feed columns
export const HNFeedColumns: HackerNews[] = [
  {
    header: "Title",
    property: "title",
    type: "text",
    hasDetails: true,
    isHideSm: false,
    details: [
      {
        property: "points",
        type: "text",
        preposition: "points",
        icon: "thumbs-up",
      },
      {
        property: "user",
        type: "text",
        preposition: "by",
        icon: "user",
      },
      {
        property: "time_ago",
        type: "text",
        preposition: "",
        icon: "watch",
      },
      {
        property: "comments_count",
        type: "text",
        preposition: "comment",
        icon: "message-square",
      },
    ],
  },
  {
    header: "Domain",
    property: "domain",
    type: "link",
    hasDetails: false,
    isHideSm: true,
  },
  {
    header: "View",
    property: "actions",
    type: "template",
    hasDetails: false,
    isHideSm: false,
  },
];
