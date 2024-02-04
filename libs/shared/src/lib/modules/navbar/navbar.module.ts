import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from '../feather-icons/icons.module';

@NgModule({
  imports: [IconsModule, RouterModule, CommonModule, NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
