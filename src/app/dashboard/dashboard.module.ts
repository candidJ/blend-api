import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from '../notifications/notifications.component';

@NgModule({
  declarations: [DashboardComponent, NotificationsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
