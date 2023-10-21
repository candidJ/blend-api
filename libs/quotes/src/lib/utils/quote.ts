import { AppConfig } from '@blend-api/shared';

export function sendTweet<T, K extends keyof T>(quote: T, author: K, text: K) {
  const quoteText = `${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote[text]}`;
  
  if (quote[author]) {
      window.open(`${quoteText}~${quote[author]}`);
  } else {
      window.open(`${quoteText}`);
  }
}
