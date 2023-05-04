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

        if (routerEvent.url.includes('/admin'))
          this.currentNavbar = NavbarEnum.ADMIN;

        if (routerEvent.url.includes('/home'))
          this.currentNavbar = NavbarEnum.HOME;

        if (routerEvent.url.includes('/create-post'))
          this.currentNavbar = NavbarEnum.CREATE_POST;

        if (routerEvent.url.includes('/verify-user'))
          this.currentNavbar = NavbarEnum.VERIFY_USER;
      });

    this.user = this.userService.get();
  }

  public get isAdmin(): boolean {
    return this.user.role === 'admin';
  }

  public get isUser(): boolean {
    return this.user.role === 'user';
  }

  public get isCompany(): boolean {
    return this.user.role === 'company';
  }

  public currentNavbar: NavbarEnum = NavbarEnum.COLLECT_POINTS;

  public user!: UserProxy;

  public adminList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.HOME,
      link: '/home',
      icon: 'assets/images/home.svg',
      iconActivated: 'assets/images/selected-home.svg',
    },
    {
      type: NavbarEnum.COLLECT_POINTS,
      link: '/collect-points',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.ADMIN,
      link: '/admin',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.CREATE_POST,
      link: '/create-post',
      icon: 'assets/images/post.svg',
      iconActivated: 'assets/images/selected-post.svg',
    },
    {
      type: NavbarEnum.VERIFY_USER,
      link: '/verify-user',
      icon: 'assets/images/company.svg',
      iconActivated: 'assets/images/selected-company.svg',
    }
  ];

  public userList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.COLLECT_POINTS,
      link: '/collect-points',
      icon: 'assets/images/collect-points.svg',
      iconActivated: 'assets/images/selected-collect-points.svg',
    },
    {
      type: NavbarEnum.HOME,
      link: '/home',
      icon: 'assets/images/home.svg',
      iconActivated: 'assets/images/selected-home.svg',
    },
    {
      type: NavbarEnum.USER,
      link: '/user',
      icon: 'assets/images/user.svg',
      iconActivated: 'assets/images/selected-user.svg',
    },
  ];

  public companyList: NavbarItemInterface[] = [
    {
      type: NavbarEnum.VERIFY_USER,
      link: '/verify-user',
      icon: 'assets/images/company.svg',
      iconActivated: 'assets/images/selected-company.svg',
    },
    {
      type: NavbarEnum.HOME,
      link: '/home',
      icon: 'assets/images/home.svg',
      iconActivated: 'assets/images/selected-home.svg',
    },
  ]

}
