import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { sendTweet } from '../../utils/quote';
import { LifeQuotesService } from '../../services/life-quotes.service';
import { ILifeQuotes, PaginationFunc } from '../../types/quotes.interface';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

@Component({
  selector: 'ba-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss'],
  providers: [LifeQuotesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeComponent implements OnInit {
  private quotesService = inject(LifeQuotesService);
  
  public quotes$: Observable<ILifeQuotes[]>;
  public paginationConfig$: Observable<PaginationConfig> =
    this.quotesService.paginationConfig$;
  public props = { first: 'quoteAuthor', second: 'quoteText' };

  constructor() {}

  onPaginationChange: PaginationFunc = (page: number) => {
    this.quotesService.fetchByPageNumber(page);
  }

  public tweet(obj: ILifeQuotes): void{
    sendTweet(obj, 'quoteAuthor', 'quoteText');
  }

  ngOnInit(): void {
    this.quotes$ = this.quotesService.fetch();
  }
}
