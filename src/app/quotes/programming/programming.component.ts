import { Component, OnInit, InjectionToken, Inject, ViewChild, forwardRef, ChangeDetectionStrategy } from '@angular/core';

import { ProgrammingQuotesService, QUOTES_SERVICE_TOKEN, ProgrammingQuotesFactory } from '../quotes.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProgrammingQuotes, PaginationConfig } from '../../shared/interface/interface';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { Quote, Quotes } from 'src/app/shared/class/quote';
import { NotificationService } from 'src/app/notifications/notification.service';

@Component({
    selector: 'app-programming',
    templateUrl: './programming.component.html',
    styleUrls: ['./programming.component.scss'],
    providers: [{
        provide: QUOTES_SERVICE_TOKEN,
        useFactory: ProgrammingQuotesFactory,
        deps: [HttpClient, NotificationService]
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgrammingComponent extends Quotes<IProgrammingQuotes> implements OnInit {

    public quotes$: Observable<IProgrammingQuotes[]>;
    public paginationConfig$: Observable<PaginationConfig> = this.programmingQuotesService.paginationConfig$;
    public props = { first: 'author', second: 'en' };

    @ViewChild('messageBox') messageBox: MessageBoxComponent<IProgrammingQuotes>;

    constructor(@Inject(forwardRef(() => QUOTES_SERVICE_TOKEN)) private programmingQuotesService: ProgrammingQuotesService) {
        super();
    }

    public onPaginationChange(page: number) {
        this.programmingQuotesService.fetchByPageNumber(page);
    }

    tweet(obj: IProgrammingQuotes): void {
        this.sendTweet(obj, 'author', 'en');
    }

    ngOnInit(): void {
        this.quotes$ = this.programmingQuotesService.fetch();
    }

}

