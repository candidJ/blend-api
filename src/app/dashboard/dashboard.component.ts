import { Component, OnInit } from '@angular/core';
import { INavbar } from '../shared/interface/interface';
import { NavbarMenuItems } from '../shared/constant/metadata.const';

@Component({
  selector: 'ba-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public navbarItems: INavbar = NavbarMenuItems;

  constructor() { }

  ngOnInit(): void { }

}
