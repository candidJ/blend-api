import { SafeStyle } from '@angular/platform-browser';

export interface BlendAPILogo {
  logo: SafeStyle;
  routerLink: string;
}

export interface NavbarMenu {
  icon: string;
  title: string;
  hasSubMenu: boolean;
  routerLink: string;
  subMenu?: NavbarMenu[];
}
