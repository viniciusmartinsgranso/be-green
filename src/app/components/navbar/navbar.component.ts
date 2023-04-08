import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarEnum } from '../../models/enums/navbar.enum';
import { NavbarItemInterface } from '../../models/interfaces/navbar.item.interface';
import { UserProxy } from '../../models/proxies/user.proxy';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd;

        if (routerEvent.url.includes('/collect-points'))
          this.currentNavbar = NavbarEnum.COLLECT_POINTS;

        if (routerEvent.url.includes('/learn'))
          this.currentNavbar = NavbarEnum.LEARN;

        if (routerEvent.url.includes('/admin'))
          this.currentNavbar = NavbarEnum.ADMIN;
      });

    this.user = this.userService.get();
  }

  public get isAdmin(): boolean {
    return this.user.role === 'admin';
  }

  public get isCompany(): boolean {
    return this.user.role === 'company';
  }

  public get isUser(): boolean {
    return this.user.role === 'user';
  }

  public currentNavbar: NavbarEnum = NavbarEnum.COLLECT_POINTS;

  public user!: UserProxy;

  public adminList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.COLLECT_POINTS,
      link: '/collect-points',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.LEARN,
      link: '/learn',
      icon: 'assets/images/learn.svg',
      iconActivated: 'assets/images/selected-learn.svg',
    },
    {
      type: NavbarEnum.ADMIN,
      link: '/admin',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.COMPANY,
      link: '/company',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
  ];

  public userList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.COLLECT_POINTS,
      link: '/collect-points',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.LEARN,
      link: '/learn',
      icon: 'assets/images/learn.svg',
      iconActivated: 'assets/images/selected-learn.svg',
    },
  ];

  public companyList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.COMPANY,
      link: '/company',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.LEARN,
      link: '/learn',
      icon: 'assets/images/learn.svg',
      iconActivated: 'assets/images/selected-learn.svg',
    },
  ];

}
