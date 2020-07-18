import { LifeQuotesService, ProgrammingQuotesService } from 'src/app/quotes/quotes.service';
import { AppConfig } from '../constant/config';

export abstract class Quotes<T> {
    sendTweet(quote: T, author: string, text: string) {
        return window.open(`${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote[text]}~${quote[author]}`);
    }

    abstract onPaginationChange(page: number): void;
}

export abstract class Quote<T> {
    protected quotesApiService: LifeQuotesService | ProgrammingQuotesService;

    constructor(quotesApiService: LifeQuotesService | ProgrammingQuotesService) {
        this.quotesApiService = quotesApiService;
    }

    protected onPaginationChange(page: number) {
        this.quotesApiService.fetchByPageNumber(page);
    }

    protected tweet(quote: T) {
        return window.open(`${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote['en']}~${quote['author']}`);
    }

    protected fetchQuotesByPageNumber(page: number) {
        return this.quotesApiService.fetchByPageNumber(page);
    }

    protected fetchQuotes() {
        return this.quotesApiService.fetch();
        // .subscribe((response) => {
        // console.log(response, "fetch life  shhsjahd khaskdhkasquotes");
        // });
    }

    protected getNoOfPages() {
        return this.quotesApiService.getNoOfPages();
    }

}