import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { filter, Subscription } from 'rxjs';
import { RegisterPayload } from '../models/payloads/create-user.payload';
import { UserService } from '../services/user.service';
import initializeApp = firebase.initializeApp;
import app = firebase.app;
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
      const admin = {
        id: 1,
        email: 'admin@email.com',
        role: 'admin',
        confirmEmail: 'admin@email.com',
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123456',
        confirmPassword: '123456',
        address: '',
      };

      const table = localStorage.getItem('users');
      const storageUsers: RegisterPayload[] = table ? JSON.parse(table) : [];

      localStorage.removeItem('loggedUser');
      storageUsers[storageUsers.length - 1] === undefined ? admin.id = 0 : admin.id = storageUsers[storageUsers.length - 1].id + 1;

      storageUsers.push(admin);
      localStorage.setItem('users', JSON.stringify(storageUsers));
    }
  }

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login'];

  public routeSubscription: Subscription;

  public firebaseConfig = {
    apiKey: "AIzaSyBFQV9Zh-llXE_3rLRjWOY2SxhtwYaVZyY",
    authDomain: "be-green-6e8dc.firebaseapp.com",
    projectId: "be-green-6e8dc",
    storageBucket: "be-green-6e8dc.appspot.com",
    messagingSenderId: "400858493652",
    appId: "1:400858493652:web:ccbe8bcbad9dbd43be0141",
    measurementId: "G-9HJZ971K5V"
  };

  public ngOnInit(): void {
    // const app = initializeApp(this.firebaseConfig);
    // const analytics = getAnalytics(app);
  }

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }
}
