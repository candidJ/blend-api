import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { BlendAPILogo, NavbarMenu } from '../../types/navbar.interface';

@Component({
  selector: 'ba-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
  @Input() navbarMenuItems : NavbarMenu[];
  @Input() appLogoWithLink : BlendAPILogo;
  @ViewChild('navbarBurger') navbarBurger: ElementRef = new ElementRef(
    'navbarBurger'
  );
  @ViewChild('appNavBarMenu') appNavBarMenu: ElementRef = new ElementRef(
    'appNavBarMenu'
  );
  @ViewChildren('menuItem') menuItem: QueryList<ElementRef> = new QueryList(
    true
  );

  constructor(private renderer: Renderer2) {}

  private toggleActiveClassOnNavbarBurgerClick() {
    if (this.navbarBurger.nativeElement.className.includes('is-active')) {
      this.renderer.removeClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.removeClass(this.appNavBarMenu.nativeElement, 'is-active');
    } else {
      this.renderer.addClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.addClass(this.appNavBarMenu.nativeElement, 'is-active');
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.navbarBurger.nativeElement, 'click', () =>
      this.toggleActiveClassOnNavbarBurgerClick()
    );
    this.menuItem.forEach((el) => {
      this.renderer.listen(el.nativeElement, 'click', () =>
        this.toggleActiveClassOnNavbarBurgerClick()
      );
    });
  }
}
