import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { HackerNewsApiService } from "src/app/news-api/services/hacker-news-api.service";
import { HackerNewsFeedDetails } from "src/app/news-api/types/hacker-news.interface";

@Component({
  selector: "ba-feed-details",
  templateUrl: "./feed-details.component.html",
  styleUrls: ["./feed-details.component.scss"],
})
export class FeedDetailsComponent implements OnInit {
  public item$: Observable<HackerNewsFeedDetails>;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService<any>) {}

  ngOnInit(): void {
    this.item$ = this.hackerNewsService.loadItemDetails();
  }
}
