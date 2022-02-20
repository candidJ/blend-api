import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ViewChild,
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
import { IProgrammingQuotes } from '../../types/quotes.interface';
import { Quotes } from '../../class/quote';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';
import { MessageBoxComponent } from 'libs/shared/src/lib/modules/message-box/components/message-box.component';

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
export class ProgrammingComponent
  extends Quotes<IProgrammingQuotes>
  implements OnInit
{
  public quotes$: Observable<IProgrammingQuotes[]>;
  public paginationConfig$: Observable<PaginationConfig> =
    this.programmingQuotesService.paginationConfig$;
  public props = { first: 'author', second: 'en' };

  @ViewChild('messageBox') messageBox!: MessageBoxComponent<IProgrammingQuotes>;

  constructor(
    @Inject(forwardRef(() => QUOTES_SERVICE_TOKEN))
    private programmingQuotesService: ProgrammingQuotesService
  ) {
    super();
  }

  public onPaginationChange(page: number) {
    this.programmingQuotesService.fetchByPageNumber(page);
  }

  tweet(obj: IProgrammingQuotes): void {
    this.sendTweet(obj, 'author', 'en');
  }

  ngOnInit(): void {
    this.quotes$ = this.programmingQuotesService.fetch();
  }
}
