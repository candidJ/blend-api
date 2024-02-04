import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GridComponent } from './components/grid.component';
import { IconsModule } from '../feather-icons/icons.module';

@NgModule({
  imports: [CommonModule, RouterModule, IconsModule, GridComponent],
  exports: [GridComponent],
})
export class GridModule {}
