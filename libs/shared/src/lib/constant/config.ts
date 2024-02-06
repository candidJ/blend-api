// TODO: Split into sub categories as per google typescript style guide (https://google.github.io/styleguide/tsguide.html)
export const AppConfig = {
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
    HASHTAGS: 'quote',
  }
};
