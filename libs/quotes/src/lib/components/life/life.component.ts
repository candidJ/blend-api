import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { sendTweet } from '../../utils/quote';
import { LifeQuotesService } from '../../services/life-quotes.service';
import {
  LifeQuote,
  PaginationFunc,
  QuoteProps,
} from '../../types/quotes.interface';
import { PaginatorModule, MessageBoxModule } from '@blend-api/shared';

@Component({
  selector: 'ba-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss'],
  providers: [LifeQuotesService],
  standalone: true,
  imports: [MessageBoxModule, PaginatorModule, AsyncPipe],
})
export class LifeComponent implements OnInit {
  #quotesService = inject(LifeQuotesService);

  quotes$: Observable<LifeQuote[]>;
  paginationConfig = this.#quotesService.paginationConfig;
  props: QuoteProps<LifeQuote> = ['quoteAuthor', 'quoteText'];

  constructor() {}

  onPaginationChange: PaginationFunc = (page: number) => {
    this.#quotesService.fetchFeedByPageNumber(page);
  };

  tweet(obj: LifeQuote): void {
    sendTweet(obj, ['quoteAuthor', 'quoteText']);
  }

  ngOnInit(): void {
    this.quotes$ = this.#quotesService.fetchQuotesFeed();
  }
}
