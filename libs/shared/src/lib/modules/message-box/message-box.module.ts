import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from '..';
import { MessageBoxComponent } from './components/message-box.component';

@NgModule({
  declarations: [MessageBoxComponent],
  imports: [IconsModule, CommonModule],
  exports: [MessageBoxComponent],
})
export class MessageBoxModule {}
