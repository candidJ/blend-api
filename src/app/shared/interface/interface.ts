import { SafeStyle } from '@angular/platform-browser';

export interface INewsArticles {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string | null, name: string | null }
    title: string;
    url: string;
    urlToImage: string;
}

export interface INewsFeed {
    articles: INewsArticles[];
    totalResults: number;
}

export interface IGridColumnsDef {
    header: string;
    property: string;
    type: 'text' | 'date' | 'template' | 'link';
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

export interface IProgrammingQuotes {
    en: string;
    author: string;
    rating: number;
    id: string;
}

export interface ILifeQuotes {
    id: string;
    quoteText: string;
    quoteAuthor: string;
}

export interface INavbarMenu {
    icon: string;
    title: string;
    hasSubMenu: boolean;
    routerLink: string;
    subMenu?: INavbarMenu[];
}

export interface INavbar {
    logo: SafeStyle;
    routerLink: string;
    navbarMenu: INavbarMenu[];
}

export interface ISubMenu {
    icon: string;
    title: string;
    subMenuItems: INavbarMenu[];
}

export interface IOpenWeatherResponse {
    list: {
        dt_txt: string;
        main: {
            temp: number,
            feels_like: number;
            temp_min: number;
            temp_max: number;
            humidity: number
        },
        weather: [
            {
                id: number;
                main: string;
                description: string;
                icon: string;
            }
        ],
        wind: {
            speed: number;
            deg: number;
        }
    }[],
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
        id: number;
        timezone: number
    }
}


export interface WeatherDefinition {
    currentTemp: number;
    feelsLike: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    title: string;
    description: string;
    date: string;
    id: number;
    city: string;
    country: string;
    sunrise: Date;
    sunset: Date;
    windSpeed: number;
    windDeg: number;
    icon?: string;
    units: string;
}

export interface CityPayload {
    city: string;
    unit: 'imperial' | 'metric';
    country: string;
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
    comments: HNComments[]
}

export interface PaginationConfig {
    pageSize: number;
    noOfPages: number;
    listLength: number;
}

export interface ILifeQuotesResponse {
    data: ILifeQuotes[];
    pagination: {
        currentPage: number,
        nextPage: number,
        totalPages: number
    },
    totalQuotes: number;
}

export interface ICalculatorLayout {
    viewValue: string;
    value: string;
    className: string;
}

export interface GeolocationCoordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}
