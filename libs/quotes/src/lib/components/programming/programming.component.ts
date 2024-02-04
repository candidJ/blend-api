import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  WritableSignal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  NotificationService,
  PaginationConfig,
  PaginatorComponent,
  MessageBoxModule,
} from '@blend-api/shared';
import {
  ProgrammingQuotesFactory,
  ProgrammingQuotesService,
  QUOTES_SERVICE_TOKEN,
} from '../../services/programming-quotes.service';
import {
  ProgrammingQuote,
  PaginationFunc,
  QuoteProps,
} from '../../types/quotes.interface';
import { sendTweet } from '../../utils/quote';

@Component({
  selector: 'ba-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.scss'],
  providers: [
    {
      provide: QUOTES_SERVICE_TOKEN,
      useFactory: ProgrammingQuotesFactory,
      deps: [HttpClient, NotificationService],
    },
  ],
  standalone: true,
  imports: [MessageBoxModule, PaginatorComponent, AsyncPipe],
})
export class ProgrammingComponent implements OnInit {
  quotes$: Observable<ProgrammingQuote[]>;
  paginationConfig: WritableSignal<PaginationConfig>;
  props: QuoteProps<ProgrammingQuote> = ['author', 'en'];

  constructor(
    @Inject(forwardRef(() => QUOTES_SERVICE_TOKEN))
    private programmingQuotesService: ProgrammingQuotesService,
  ) {
    this.paginationConfig = this.programmingQuotesService.paginationConfig;
  }

  onPaginationChange: PaginationFunc = (page: number) => {
    this.programmingQuotesService.fetchFeedByPageNumber(page);
  };

  tweet(obj: ProgrammingQuote): void {
    sendTweet(obj, ['author', 'en']);
  }

  ngOnInit(): void {
    this.quotes$ = this.programmingQuotesService.fetchQuotesFeed();
  }
}
