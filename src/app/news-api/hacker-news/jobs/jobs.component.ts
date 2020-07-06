import { Component, OnInit } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { HackerNewsApiService } from '../hacker-news-api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends FeedComponent implements OnInit {
  constructor(hackerService: HackerNewsApiService) {
    super(hackerService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
