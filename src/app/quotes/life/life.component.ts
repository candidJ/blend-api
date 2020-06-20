import { Component, OnInit, ViewChild } from '@angular/core';
import { ILifeQuotes } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';
import { LifeQuotesService } from '../quotes.service';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { Quote, Quotes } from 'src/app/shared/class/quote';

@Component({
    selector: 'app-life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.scss'],
    providers: [LifeQuotesService]
})
export class LifeComponent extends Quotes<ILifeQuotes> implements OnInit {

    public quotes$: Observable<ILifeQuotes[]>;
    public noOfPages$: Observable<number[]>;
    public props = { first: 'quoteAuthor', second: 'quoteText' };

    public quotesService: LifeQuotesService;

    @ViewChild('messageBox') messageBox: MessageBoxComponent<ILifeQuotes>;

    constructor(quotesService: LifeQuotesService) {
        super();
        this.quotesService = quotesService;
    }

    public onPaginationChange(page: number) {
        this.quotesService.fetchByPageNumber(page);
    }

    public tweet(obj: ILifeQuotes) {
        this.sendTweet(obj);
    }

    ngOnInit(): void {
        this.quotes$ = this.quotesService.data$;
        this.quotesService.fetch().subscribe();

        this.noOfPages$ = this.quotesService.getNoOfPages();
        this.quotesService.fetchByPageNumber(1);
    }

}
