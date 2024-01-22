import { Component } from '@angular/core';
import { AppLogoWithLink, NavbarMenu, NavbarMenuItems } from '@blend-api/shared';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Blend API';
  appLogoWithLink = AppLogoWithLink;
  navbarMenuItems: Array<NavbarMenu> = NavbarMenuItems;
}
