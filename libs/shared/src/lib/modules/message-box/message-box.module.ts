import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from '..';
import { MessageBoxComponent } from './components/message-box.component';

@NgModule({
  imports: [IconsModule, CommonModule, MessageBoxComponent],
  exports: [MessageBoxComponent],
})
export class MessageBoxModule {}
