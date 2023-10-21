import { Component } from '@angular/core';
import { AppLogoWithLink, NavbarMenu, NavbarMenuItems } from '../../../../libs/shared/src';

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
