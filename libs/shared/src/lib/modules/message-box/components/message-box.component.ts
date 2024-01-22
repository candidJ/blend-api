import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'ba-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBoxComponent<T, K extends keyof T> {
  // TODO: rename bindings
  @Input() data: T[];
  @Input() props: K[];
  @Output() tweet = new EventEmitter();

  constructor() {}

  onTweet(obj: T): void {
    this.tweet.emit(obj);
  }

}
