import { Component, OnInit, Input } from "@angular/core";
import { HNComments } from "src/app/news-api/types/hacker-news.interface";

@Component({
  selector: "ba-comments",
  templateUrl: "./comments.component.html",
  styleUrls: [
    "../feed-details/feed-details.component.scss",
    "./comments.component.scss",
  ],
})
export class CommentsComponent implements OnInit {
  @Input("comment") comment: HNComments;

  ngOnInit(): void {}
}
