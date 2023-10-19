type ConfigType = 'jobs' | 'feed' | 'show' | 'ask' | 'latest';
interface ConfigProps {
  URL: string;
  TOTAL_RECORDS: number;
  PAGE_SIZE: number;
  NO_OF_PAGES: number;
}

type HackerNewsConfig  = {
  [k in ConfigType] : ConfigProps;
}

const HACKER_NEWS: HackerNewsConfig = {
  'feed': {
    URL: 'news',
    TOTAL_RECORDS: 180,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 6,
  },
  'jobs': {
    URL: 'jobs',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  },
  'latest': {
    URL: 'newest',
    TOTAL_RECORDS: 120,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 4,
  },
  'show': {
    URL: 'show',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  },
  'ask': {
    URL: 'ask',
    TOTAL_RECORDS: 60,
    PAGE_SIZE: 30,
    NO_OF_PAGES: 2,
  }
};

export const AppConfig = {
  NEWS_API_CONFIG: {
    NEWS_API_URL: 'https://newsapi.org/v2/top-headlines',
    PAGE_SIZE: 8,
    API_KEY: '97564ef7087c4ae9acecc2932b0561ed',
    COUNTRY: 'us',
  },
  IMAGES: {
    LOGO: '../../assets/images/blend-api-logo.png',
  },
  WEATHER_API_CONFIG: {
    URL: 'https://api.openweathermap.org/data/2.5/forecast',
    API_KEY: 'eff556784983bcac5c6d749bad8e1090',
    UNITS: 'metric',
  },
  LIFE_QUOTES: {
    URL: 'https://quote-garden.onrender.com/api/v3/quotes/',
    LIMIT: 20,
  },
  PROGRAMMING_QUOTES: {
    URL: 'https://programming-quotes-api.herokuapp.com/quotes/',
    PAGE_SIZE: 20,
    TOTAL_RECORDS: 501,
  },
  TWITTER: {
    URL: 'https://www.twitter.com/intent/tweet?hashtags',
    HASHTAGS: 'quotes',
  },
  HACKER_NEWS_BASE_URL: 'https://api.hackerwebapp.com/',
  HACKER_NEWS
};
