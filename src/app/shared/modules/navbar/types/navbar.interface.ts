import { SafeStyle } from "@angular/platform-browser";

export interface INavbar {
  logo: SafeStyle;
  routerLink: string;
  navbarMenu: INavbarMenu[];
}

export interface INavbarMenu {
  icon: string;
  title: string;
  hasSubMenu: boolean;
  routerLink: string;
  subMenu?: INavbarMenu[];
}

export interface ISubMenu {
  icon: string;
  title: string;
  subMenuItems: INavbarMenu[];
}
