import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  LOGO_WITH_LINK,
  NavbarMenu,
  NAVBAR_MENU_ITEMS,
  NavbarComponent,
  NotificationsComponent,
  LoaderComponent,
} from '@blend-api/shared';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    LoaderComponent,
    NotificationsComponent,
  ],
})
export class AppComponent {
  title = 'Blend API';
  appLogoWithLink = LOGO_WITH_LINK;
  navbarMenuItems: Array<NavbarMenu> = NAVBAR_MENU_ITEMS;
}
