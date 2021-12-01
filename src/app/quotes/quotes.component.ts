import { Component, OnInit } from '@angular/core';

import { LifeQuotesService, ProgrammingQuotesService } from './quotes.service';

@Component({
  selector: 'ba-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  // <T extends IProgrammingQuotes | ILifeQuotes>

  ngOnInit(): void {

  }

}
