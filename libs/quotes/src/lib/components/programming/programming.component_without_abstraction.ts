import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ProgrammingQuotesFactory,
  ProgrammingQuotesService,
  QUOTES_SERVICE_TOKEN,
} from '../../services/programming-quotes.service';
import { IProgrammingQuotes } from '../../types/quotes.interface';
import { MessageBoxComponent } from 'libs/shared/src/lib/modules/message-box/components/message-box.component';
import { AppConfig } from '@blend-api/shared';

@Component({
  selector: 'ba-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.scss'],
  providers: [
    {
      provide: QUOTES_SERVICE_TOKEN,
      useFactory: ProgrammingQuotesFactory,
      deps: [HttpClient],
    },
  ],
})
export class ProgrammingComponentOld implements OnInit {
  public quotes$: Observable<IProgrammingQuotes[]>;
  public quotes: IProgrammingQuotes[];
  public noOfPages$: Observable<number[]>;
  @ViewChild('messageBox') messageBox: MessageBoxComponent<IProgrammingQuotes>;

  constructor(
    @Inject(QUOTES_SERVICE_TOKEN)
    private programmingQuotesService: ProgrammingQuotesService
  ) {}

  public onPaginationChange(page: number) {
    this.programmingQuotesService.fetchByPageNumber(page);
  }

  tweet(quote: IProgrammingQuotes) {
    return window.open(
      `${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote.en}~${quote.author}`
    );
  }

  private fetchQuotes() {
    // return this.quotes$ =
    this.programmingQuotesService
      .fetch()
      .subscribe((response: IProgrammingQuotes[]) => {
        this.quotes = response;
      });
  }

  ngOnInit(): void {
    this.fetchQuotes();
    // this.noOfPages$ = this.programmingQuotesService.getNoOfPages();
    this.programmingQuotesService.fetchByPageNumber(1);
  }
}
