import { Component, OnInit } from '@angular/core';
import { QuotesComponent, QuotesBase } from '../quotes.component';
import { ProgrammingQuotesService } from '../quotes.service';
import { IProgrammingQuotes, ILifeQuotes } from 'src/app/utils/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.scss']
})
export class ProgrammingComponent implements OnInit {

  public quotes$: Observable<IProgrammingQuotes[]>;
  public quotes: IProgrammingQuotes[];
  public noOfPages$: Observable<number[]>;

  constructor(private programmingQuotesService: ProgrammingQuotesService) { }

  public onPaginationChange(page: number) {
    this.programmingQuotesService.fetchByPageNumber(page);
  }

  private fetchQuotes() {
    // return this.quotes$ =
    this.programmingQuotesService.fetch()
      .subscribe((response: IProgrammingQuotes[]) => {
        console.log(response, "fetch programming quotes");
        this.quotes = response;
      });
  }

  ngOnInit(): void {
    this.fetchQuotes();
    this.noOfPages$ = this.programmingQuotesService.getNoOfPages();
    console.log("programming quotes", this.quotes$, this.noOfPages$);
    this.programmingQuotesService.fetchByPageNumber(1);
  }

}
