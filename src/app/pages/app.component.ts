import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { filter, Subscription } from 'rxjs';
import { RegisterPayload } from '../models/payloads/create-user.payload';
import { CollectPointProxy } from '../models/proxies/collect-point.proxy';
import { CollectService } from '../services/collect.service';
import { UserService } from '../services/user.service';
import initializeApp = firebase.initializeApp;
import app = firebase.app;
import { getAnalytics } from 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly collectService: CollectService,
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

      const tableAdmin = localStorage.getItem('users');
      const storageAdmin: RegisterPayload[] = tableAdmin ? JSON.parse(tableAdmin) : [];

      localStorage.removeItem('loggedUser');
      storageAdmin[storageAdmin.length - 1] === undefined ? admin.id = 0 : admin.id = storageAdmin[storageAdmin.length - 1].id + 1;

      storageAdmin.push(admin);
      localStorage.setItem('users', JSON.stringify(storageAdmin));

      const user = {
        id: 1,
        email: 'vini@email.com',
        role: 'user',
        confirmEmail: 'vini@email.com',
        name: 'vini',
        cpf: '123.123.123-12',
        phone: '(12) 31231-2312',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123456',
        confirmPassword: '123456',
        address: '',
        points: 0,
      };

      const tableUser = localStorage.getItem('users');
      const storageUser: RegisterPayload[] = tableUser ? JSON.parse(tableUser) : [];

      localStorage.removeItem('loggedUser');
      storageUser[storageUser.length - 1] === undefined ? user.id = 0 : user.id = storageUser[storageUser.length - 1].id + 1;

      storageUser.push(user);
      localStorage.setItem('users', JSON.stringify(storageUser));

      const company = {
        id: 1,
        email: 'company@email.com',
        role: 'company',
        confirmEmail: 'company@email.com',
        name: 'company',
        cnpj: '123.123.123/1231-12',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123456',
        confirmPassword: '123456',
        address: '',
      };

      const tableCompany = localStorage.getItem('users');
      const storageCompany: RegisterPayload[] = tableCompany ? JSON.parse(tableCompany) : [];

      localStorage.removeItem('loggedUser');
      storageCompany[storageCompany.length - 1] === undefined ? company.id = 0 : company.id = storageCompany[storageCompany.length - 1].id + 1;

      storageCompany.push(company);
      localStorage.setItem('users', JSON.stringify(storageCompany));
    }

    const collectList = this.collectService.get();

    if (!collectList) {
      const collectTable = localStorage.getItem('collect');
      const storageTable: CollectPointProxy[] = collectTable ? JSON.parse(collectTable) : [];

      //Vila Helena
      const helenaPoint: CollectPointProxy = {
        name: 'Ecoponto Vila Helena',
        address: 'Rua Roque Sampaio, 100 – Vila Helena',
        locale: {
          latitude: -23.477656,
          longitude: -47.4929819,
        },
        updatedAt: new Date(),
        createdAt: new Date(),
        id: 0,
      };

      storageTable[storageTable.length - 1] === undefined ? helenaPoint.id = 0 : helenaPoint.id = storageTable[storageTable.length - 1].id + 1;
      storageTable.push(helenaPoint);

      //Cajuru
      const cajuruPoint: CollectPointProxy = {
        name: 'Ecoponto Cajuru',
        address: 'Rua Mário Monteiro de Carvalho, s/n – Cajuru',
        locale: {
          latitude: -23.3975345,
          longitude: -47.3801152,
        },
        updatedAt: new Date(),
        createdAt: new Date(),
        id: 1,
      };

      storageTable[storageTable.length - 1] === undefined ? cajuruPoint.id = 0 : cajuruPoint.id = storageTable[storageTable.length - 1].id + 1;
      storageTable.push(cajuruPoint);

      //Vila Isabel
      const isabelPoint: CollectPointProxy = {
        name: 'Ecoponto Vila Isabel',
        address: 'R. Lourenço Molinero, 200 - Vila Isabel',
        locale: {
          latitude: -23.5039084,
          longitude: -47.4408528,
        },
        updatedAt: new Date(),
        createdAt: new Date(),
        id: 1,
      };

      storageTable[storageTable.length - 1] === undefined ? isabelPoint.id = 0 : isabelPoint.id = storageTable[storageTable.length - 1].id + 1;
      storageTable.push(isabelPoint);

      //Etec Votorantim
      const etecPoint: CollectPointProxy = {
        name: 'Etec Professor Elias Miguel Júnior',
        address: 'Rua Irma Ferrarezi - Vila Votocel, Votorantim',
        locale: {
          latitude: -23.5564309,
          longitude: -47.4414853,
        },
        updatedAt: new Date(),
        createdAt: new Date(),
        id: 1,
      };

      storageTable[storageTable.length - 1] === undefined ? etecPoint.id = 0 : etecPoint.id = storageTable[storageTable.length - 1].id + 1;
      storageTable.push(etecPoint);

      const poiatoPoint: CollectPointProxy = {
        name: 'Poiato Recicla',
        address: 'Rua Domingos Arruda Ferraz, 51 - Bloco 04 - Parque Jataí, Votorantim - SP',
        locale: {
          latitude: -23.5691732,
          longitude: -47.4608709,
        },
        updatedAt: new Date(),
        createdAt: new Date(),
        id: 1,
      };

      storageTable[storageTable.length - 1] === undefined ? poiatoPoint.id = 0 : poiatoPoint.id = storageTable[storageTable.length - 1].id + 1;
      storageTable.push(poiatoPoint);

      localStorage.setItem('collect', JSON.stringify(storageTable));
    }
  }

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login'];

  public routeSubscription: Subscription;

  public firebaseConfig = {
    apiKey: 'AIzaSyBFQV9Zh-llXE_3rLRjWOY2SxhtwYaVZyY',
    authDomain: 'be-green-6e8dc.firebaseapp.com',
    projectId: 'be-green-6e8dc',
    storageBucket: 'be-green-6e8dc.appspot.com',
    messagingSenderId: '400858493652',
    appId: '1:400858493652:web:ccbe8bcbad9dbd43be0141',
    measurementId: 'G-9HJZ971K5V',
  };

  public ngOnInit(): void {
    // const app = initializeApp(this.firebaseConfig);
    // const analytics = getAnalytics(app);
  }

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }
}
