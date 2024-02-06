import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HackerNewsItemComment } from '../../types';
import { FeatherModule } from 'angular-feather';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ba-comments',
  templateUrl: './comments.component.html',
  styleUrls: [
    '../feed-details/feed-details.component.scss',
    './comments.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, FeatherModule],
})
export class CommentsComponent {
  @Input() comment: HackerNewsItemComment;
}
