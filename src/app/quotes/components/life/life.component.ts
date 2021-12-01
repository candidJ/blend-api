import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";

import { MessageBoxComponent } from "src/app/shared/modules/message-box/components/message-box.component";
import { PaginationConfig } from "src/app/shared/modules/paginator/types/paginator.interface";
import { Quotes } from "src/app/quotes/class/quote";
import { ILifeQuotes } from "src/app/quotes/types/quotes.interface";
import { LifeQuotesService } from "src/app/quotes/services/life-quotes.service";

@Component({
  selector: "ba-life",
  templateUrl: "./life.component.html",
  styleUrls: ["./life.component.scss"],
  providers: [LifeQuotesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeComponent extends Quotes<ILifeQuotes> implements OnInit {
  public quotes$: Observable<ILifeQuotes[]>;
  public paginationConfig$: Observable<PaginationConfig> =
    this.quotesService.paginationConfig$;
  public props = { first: "quoteAuthor", second: "quoteText" };

  @ViewChild("messageBox") messageBox: MessageBoxComponent<ILifeQuotes>;

  constructor(
    @Inject(forwardRef(() => LifeQuotesService))
    private quotesService: LifeQuotesService
  ) {
    super();
  }

  public onPaginationChange(page: number) {
    this.quotesService.fetchByPageNumber(page);
  }

  public tweet(obj: ILifeQuotes) {
    this.sendTweet(obj, "quoteAuthor", "quoteText");
  }

  ngOnInit(): void {
    this.quotes$ = this.quotesService.fetch();
  }
}
