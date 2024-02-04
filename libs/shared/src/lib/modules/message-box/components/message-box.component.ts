import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'ba-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeatherModule],
})
export class MessageBoxComponent<T, K extends keyof T> {
  @Input() messages: T[];
  @Input() messageKeys: K[];
  @Output() tweet = new EventEmitter();

  constructor() {}

  onTweet(obj: T): void {
    this.tweet.emit(obj);
  }
}
