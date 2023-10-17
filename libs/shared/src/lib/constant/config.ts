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
  HACKER_NEWS: {
    BASE: 'http://api.hackerwebapp.com/',
    FEED: {
      URL: 'news',
      TOTAL_RECORDS: 180,
      PAGE_SIZE: 30,
      NO_OF_PAGES: 6,
    },
    JOBS: {
      URL: 'jobs',
      TOTAL_RECORDS: 60,
      PAGE_SIZE: 30,
      NO_OF_PAGES: 2,
    },
    LATEST: {
      URL: 'newest',
      TOTAL_RECORDS: 120,
      PAGE_SIZE: 30,
      NO_OF_PAGES: 4,
    },
    SHOW: {
      URL: 'show',
      TOTAL_RECORDS: 60,
      PAGE_SIZE: 30,
      NO_OF_PAGES: 2,
    },
    ASK: {
      URL: 'ask',
      TOTAL_RECORDS: 60,
      PAGE_SIZE: 30,
      NO_OF_PAGES: 2,
    },
  },
};
