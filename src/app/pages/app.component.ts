import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.routeSubscription = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd;

        if (!this.routesWithoutNavbar.includes(routerEvent.url)) {
          if (!this.routesWithoutNavbar.includes(routerEvent.urlAfterRedirects))
            this.canShowNavbar = true;
        } else {
          this.canShowNavbar = false;
        }
      });

    const usersList = this.userService.getUsers();

    if (!usersList) {
      this.userService.create({
        id: 0,
        email: 'admin@email.com',
        role: 'admin',
        confirmEmail: 'admin@email.com',
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123456',
        confirmPassword: '123456',
      });
    }
  }

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login'];

  public routeSubscription: Subscription;

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }
}
