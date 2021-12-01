import { AppConfig } from "src/app/shared/constant/config";

export abstract class Quotes<T> {
  sendTweet(quote: T, author: string, text: string) {
    const quoteText = `${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote[text]}`;
    if (quote[author]) {
      return window.open(`${quoteText}~${quote[author]}`);
    } else {
      return window.open(`${quoteText}`);
    }
  }

  abstract onPaginationChange(page: number): void;
}
