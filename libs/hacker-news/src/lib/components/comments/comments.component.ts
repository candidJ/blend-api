import { Component, OnInit, Input } from '@angular/core';
import { HNComments } from '../../types';

@Component({
  selector: 'ba-comments',
  templateUrl: './comments.component.html',
  styleUrls: [
    '../feed-details/feed-details.component.scss',
    './comments.component.scss',
  ],
})
export class CommentsComponent implements OnInit {
  @Input('comment') comment: HNComments;

  ngOnInit(): void {}
}
