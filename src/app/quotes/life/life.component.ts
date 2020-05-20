import { Component, OnInit, ViewChild } from '@angular/core';
import { ILifeQuotes } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';
import { LifeQuotesService } from '../quotes.service';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { Quote } from 'src/app/shared/class/quote';

@Component({
    selector: 'app-life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.scss'],
    providers: [LifeQuotesService]
})
export class LifeComponent extends Quote<ILifeQuotes> implements OnInit {

    public quotes$: Observable<ILifeQuotes[]>;
    public quotes: ILifeQuotes[];
    public noOfPages$: Observable<number[]>;
    public props = { first: 'quoteAuthor', second: 'quoteText' };

    protected quotesService: LifeQuotesService;

    @ViewChild('messageBox') messageBox: MessageBoxComponent<ILifeQuotes>;

    constructor(quotesService: LifeQuotesService) {
        super(quotesService)
    }

    public onPaginationChange(page: number) {
        this.fetchQuotesByPageNumber(page);
    }

    public onClick(obj: ILifeQuotes) {
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
