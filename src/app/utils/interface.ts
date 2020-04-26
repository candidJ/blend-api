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
    articles: INewsArticles[]
    totalResults: number;
}


export interface IGridColumnsDef {
    header: string;
    property: string;
}