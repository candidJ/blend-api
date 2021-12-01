import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { AppConfig } from "src/app/shared/constant/config";
import {
  ProgrammingQuotesFactory,
  ProgrammingQuotesService,
  QUOTES_SERVICE_TOKEN,
} from "src/app/quotes/services/programming-quotes.service";
import { IProgrammingQuotes } from "src/app/quotes/types/quotes.interface";
import { MessageBoxComponent } from "src/app/shared/modules/message-box/components/message-box.component";

@Component({
  selector: "ba-programming",
  templateUrl: "./programming.component.html",
  styleUrls: ["./programming.component.scss"],
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
  @ViewChild("messageBox") messageBox: MessageBoxComponent<IProgrammingQuotes>;

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
        // console.log(response, "fetch programming quotes");
        this.quotes = response;
      });
  }

  ngOnInit(): void {
    this.fetchQuotes();
    // this.noOfPages$ = this.programmingQuotesService.getNoOfPages();
    // console.log("programming quotes", this.quotes$, this.noOfPages$);
    this.programmingQuotesService.fetchByPageNumber(1);
  }
}
