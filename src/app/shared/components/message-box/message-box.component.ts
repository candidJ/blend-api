import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent<T> implements OnInit {
  @Input('data') messages: T[];
  @Input('props') props;
  @Output('tweet') 
  private emitTweet = new EventEmitter();

  constructor() { }

  onTweet(obj: T): void {
    this.emitTweet.emit(obj);
  }

  ngOnInit(): void {
    console.log(this.messages);
  }

}
