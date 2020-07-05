export const AppConfig = {

    NEWS_API_CONFIG: {
        NEWS_API_URL: "https://newsapi.org/v2/top-headlines",
        PAGE_SIZE: 8,
        API_KEY: '97564ef7087c4ae9acecc2932b0561ed',
        COUNTRY: 'us'
    },
    IMAGES: {
        LOGO: "../../assets/images/api-feed.png"
    },
    WEATHER_API_CONFIG: {
        URL: "https://api.openweathermap.org/data/2.5/forecast",
        API_KEY: "eff556784983bcac5c6d749bad8e1090",
        UNITS: "metric"
    },
    LIFE_QUOTES: {
        URL: "https://quote-garden.herokuapp.com/api/v2/quotes/all",
        LIMIT: 100
    },
    PROGAMMING_QUOTES: {
        URL: "https://programming-quotes-api.herokuapp.com/quotes/page/",
        PAGE_SIZE: 20,
        TOTAL_PAGES: 501
    },
    TWITTER: {
        URL: "https://www.twitter.com/intent/tweet?hashtags",
        HASHTAGS: 'programmingquotes, quotes'
    },
    HACKER_NEWS:{
        FEED_URL:"http://node-hnapi.herokuapp.com/news",
        JOBS_URL:"http://node-hnapi.herokuapp.com/jobs",
        TOTAL_PAGES: 100
    }

};