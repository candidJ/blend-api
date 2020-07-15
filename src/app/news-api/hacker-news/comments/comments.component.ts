import { Component, OnInit, Input } from '@angular/core';
import { HNComments } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../feed-details/feed-details.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input('comment') comment: HNComments;

  ngOnInit(): void {
  }

}
