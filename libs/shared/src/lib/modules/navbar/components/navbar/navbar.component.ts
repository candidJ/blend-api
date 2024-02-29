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
  inject,
} from '@angular/core';
import { LogoLink, NavbarMenu } from '../../types/navbar.interface';
import { FeatherModule } from 'angular-feather';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ba-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FeatherModule],
})
export class NavbarComponent implements AfterViewInit {
  @Input() navbarMenuItems: NavbarMenu[];
  @Input() appLogoWithLink: LogoLink;
  @ViewChild('navbarBurger') navbarBurger: ElementRef = new ElementRef(
    'navbarBurger',
  );
  @ViewChild('appNavBarMenu') appNavBarMenu: ElementRef = new ElementRef(
    'appNavBarMenu',
  );
  @ViewChildren('menuItem') menuItem: QueryList<ElementRef> = new QueryList(
    true,
  );

  #renderer: Renderer2 = inject(Renderer2);

  private toggleActiveClassOnNavbarBurgerClick() {
    if (this.navbarBurger.nativeElement.className.includes('is-active')) {
      this.#renderer.removeClass(this.navbarBurger.nativeElement, 'is-active');
      this.#renderer.removeClass(this.appNavBarMenu.nativeElement, 'is-active');
    } else {
      this.#renderer.addClass(this.navbarBurger.nativeElement, 'is-active');
      this.#renderer.addClass(this.appNavBarMenu.nativeElement, 'is-active');
    }
  }

  ngAfterViewInit(): void {
    this.#renderer.listen(this.navbarBurger.nativeElement, 'click', () =>
      this.toggleActiveClassOnNavbarBurgerClick(),
    );
    this.menuItem.forEach((el) => {
      this.#renderer.listen(el.nativeElement, 'click', () => {
        this.toggleActiveClassOnNavbarBurgerClick();
        el.nativeElement.blur();
      });
    });
  }
}
