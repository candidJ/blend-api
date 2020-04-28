import { Component, OnInit } from '@angular/core';

import { LifeQuotesService, ProgrammingQuotesService } from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  // <T extends IProgrammingQuotes | ILifeQuotes>

  ngOnInit(): void {

  }

}

export class QuotesBase {
  protected quotesApiService: LifeQuotesService | ProgrammingQuotesService;
  constructor(quotesApiService: LifeQuotesService | ProgrammingQuotesService) {
    this.quotesApiService = quotesApiService;
  }

  protected fetchQuotesByPageNumber(page: number) {
    return this.quotesApiService.fetchByPageNumber(page);
  }

  protected fetchQuotes() {
    return this.quotesApiService.fetch();
    // .subscribe((response) => {
    //   console.log(response, "fetch life quotes");
    // });
  }

  protected getNoOfPages() {
    return this.quotesApiService.getNoOfPages();
  }

}