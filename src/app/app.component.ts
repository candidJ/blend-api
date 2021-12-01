import { Component } from "@angular/core";

import { NavbarMenuItems } from "src/app/shared/modules/navbar/constants/navbar-menu-items.constant";
import { INavbar } from "src/app/shared/modules/navbar/types/navbar.interface";

@Component({
  selector: "ba-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Blend API";
  public navbarItems: INavbar = NavbarMenuItems;
}
