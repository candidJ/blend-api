import { ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ILifeQuotes, PaginationConfig } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';
import { LifeQuotesService } from '../quotes.service';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { Quote, Quotes } from 'src/app/shared/class/quote';

@Component({
    selector: 'app-life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.scss'],
    providers: [LifeQuotesService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LifeComponent extends Quotes<ILifeQuotes> implements OnInit {

    public quotes$: Observable<ILifeQuotes[]>;
    public paginationConfig$: Observable<PaginationConfig> = this.quotesService.paginationConfig$;
    public props = { first: 'quoteAuthor', second: 'quoteText' };

    @ViewChild('messageBox') messageBox: MessageBoxComponent<ILifeQuotes>;

    constructor(@Inject(forwardRef(() => LifeQuotesService)) private quotesService: LifeQuotesService) {
        super();
    }

    public onPaginationChange(page: number) {
        this.quotesService.fetchByPageNumber(page);
    }

    public tweet(obj: ILifeQuotes) {
        this.sendTweet(obj, 'quoteAuthor', 'quoteText');
    }

    ngOnInit(): void {
        this.quotes$ = this.quotesService.fetch();
    }

}
