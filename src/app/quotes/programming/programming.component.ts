import { Component, OnInit, InjectionToken, Inject, ViewChild } from '@angular/core';

import { ProgrammingQuotesService, QUOTES_SERVICE_TOKEN, ProgrammingQuotesFactory } from '../quotes.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProgrammingQuotes } from '../../shared/interface/interface';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { Quote } from 'src/app/shared/class/quote';

@Component({
    selector: 'app-programming',
    templateUrl: './programming.component.html',
    styleUrls: ['./programming.component.scss'],
    providers: [{
        provide: QUOTES_SERVICE_TOKEN,
        useFactory: ProgrammingQuotesFactory,
        deps: [HttpClient]
    }]
})
export class ProgrammingComponent extends Quote<IProgrammingQuotes> implements OnInit {

    public quotes$: Observable<IProgrammingQuotes[]>;
    public quotes: IProgrammingQuotes[];
    public noOfPages$: Observable<number[]>;
    public props = { first: 'author', second: 'en' };

    protected programmingQuotesService: ProgrammingQuotesService;

    @ViewChild('messageBox') messageBox: MessageBoxComponent<IProgrammingQuotes>;

    constructor(@Inject(QUOTES_SERVICE_TOKEN) programmingQuotesService: ProgrammingQuotesService) {
        super(programmingQuotesService)
    }

    public onPaginationChange(page: number) {
        this.fetchQuotesByPageNumber(page);
    }

    public onClick(obj: IProgrammingQuotes) {
        this.tweet(obj);
    }

    ngOnInit(): void {
        // TODO: passing observable as Inputs

        // this.quotes$ = this.fetchQuotes();
        this.fetchQuotes().subscribe(quotes => {
            console.log(quotes);
            this.quotes = quotes;
        })
        this.noOfPages$ = this.getNoOfPages();
        this.fetchQuotesByPageNumber(1);
    }

}

