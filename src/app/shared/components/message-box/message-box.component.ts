import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent<T> implements OnInit {
  @Input('data') data: T[];
  @Output('onClick') onClick = new EventEmitter();

  constructor() { }

  tweet(obj: T): void {
    this.onClick.emit(obj);
  }

  ngOnInit(): void {
    // console.log(this.data, "data in message box component");
  }

}
