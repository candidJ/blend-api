import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ProgrammingQuotesFactory,
  ProgrammingQuotesService,
  QUOTES_SERVICE_TOKEN,
} from '../../services/programming-quotes.service';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { IProgrammingQuotes, PaginationFunc } from '../../types/quotes.interface';
import { sendTweet } from '../../utils/quote';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammingComponent implements OnInit {
  public quotes$: Observable<IProgrammingQuotes[]>;
  public paginationConfig$: Observable<PaginationConfig> =
    this.programmingQuotesService.paginationConfig$;
  public props = { first: 'author', second: 'en' };

  constructor(
    @Inject(forwardRef(() => QUOTES_SERVICE_TOKEN))
    private programmingQuotesService: ProgrammingQuotesService
  ) { }

  onPaginationChange: PaginationFunc = (page: number)=> {
    this.programmingQuotesService.fetchByPageNumber(page);
  }

  tweet(obj: IProgrammingQuotes): void {
    sendTweet(obj, 'author', 'en');
  }

  ngOnInit(): void {
    this.quotes$ = this.programmingQuotesService.fetch();
  }
}
