import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AppLogoWithLink,
  NavbarMenu,
  NavbarMenuItems,
  NavbarModule,
  NotificationsModule,
  LoaderComponent,
} from '@blend-api/shared';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarModule, RouterOutlet, LoaderComponent, NotificationsModule],
})
export class AppComponent {
  title = 'Blend API';
  appLogoWithLink = AppLogoWithLink;
  navbarMenuItems: Array<NavbarMenu> = NavbarMenuItems;
}
