import { SafeStyle } from '@angular/platform-browser';

export interface LogoLink {
  logo: SafeStyle;
  routerLink: string;
}

interface MenuItems {
  icon: string;
  title: string;
  routerLink: string;
}

interface WithoutSubMenu extends MenuItems {
  hasSubMenu: false;
}

export interface WithSubMenu extends MenuItems {
  hasSubMenu: true;
  subMenu: Array<WithSubMenu | WithoutSubMenu>;
}

export type NavbarMenu = WithoutSubMenu | WithSubMenu;
