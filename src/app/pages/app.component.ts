import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { filter, Subscription } from 'rxjs';
import { RegisterPayload } from '../models/payloads/create-user.payload';
import { CollectPointProxy } from '../models/proxies/collect-point.proxy';
import { PostProxy } from '../models/proxies/post.proxy';
import { CollectService } from '../services/collect.service';
import { PostService } from '../services/post.service';
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
    private readonly postService: PostService,
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

    this.initializeUsers();
    this.initializeCollectPoints();
    this.initializePosts();
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

  public initializeCollectPoints(): void {
    const collectList = this.collectService.get();

    if (!collectList) {
      const collectTable = localStorage.getItem('collect');
      const storageTable: CollectPointProxy[] = collectTable ? JSON.parse(collectTable) : [];

      const points: CollectPointProxy[] = [
        {
          //Vila Helena
          name: 'Ecoponto Vila Helena',
          address: 'Rua Roque Sampaio, 100 – Vila Helena',
          locale: {
            latitude: -23.477656,
            longitude: -47.4929819,
          },
          updatedAt: new Date(),
          createdAt: new Date(),
          id: 0,
        },
        {
          //Cajuru
          name: 'Ecoponto Cajuru',
          address: 'Rua Mário Monteiro de Carvalho, s/n – Cajuru',
          locale: {
            latitude: -23.3975345,
            longitude: -47.3801152,
          },
          updatedAt: new Date(),
          createdAt: new Date(),
          id: 0,
        },
        {
          //Vila Isabel
          name: 'Ecoponto Vila Isabel',
          address: 'R. Lourenço Molinero, 200 - Vila Isabel',
          locale: {
            latitude: -23.5039084,
            longitude: -47.4408528,
          },
          updatedAt: new Date(),
          createdAt: new Date(),
          id: 0,
        },
        {
          //Etec Votorantim
          name: 'Etec Professor Elias Miguel Júnior',
          address: 'Rua Irma Ferrarezi - Vila Votocel, Votorantim',
          locale: {
            latitude: -23.5564309,
            longitude: -47.4414853,
          },
          updatedAt: new Date(),
          createdAt: new Date(),
          id: 0,
        },
        {
          name: 'Poiato Recicla',
          address: 'Rua Domingos Arruda Ferraz, 51 - Bloco 04 - Parque Jataí, Votorantim - SP',
          locale: {
            latitude: -23.5691732,
            longitude: -47.4608709,
          },
          updatedAt: new Date(),
          createdAt: new Date(),
          id: 0,
        }
      ]

      points.forEach(point => {
        storageTable[storageTable.length - 1] === undefined ? point.id = 0 : point.id = storageTable[storageTable.length - 1].id + 1;
        storageTable.push(point);
      });

      localStorage.setItem('collect', JSON.stringify(storageTable));
    }
  }

  public initializeUsers(): void {
    const usersList = this.userService.getUsers();

    if (!usersList) {
      const users: RegisterPayload[] = [
        {
          id: 0,
          email: 'admin@email.com',
          role: 'admin',
          confirmEmail: 'admin@email.com',
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
          password: '123456',
          confirmPassword: '123456',
          address: '',
        },
        {
          id: 0,
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
        },
        {
          id: 0,
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
        }
      ];

      const tableUsers = localStorage.getItem('users');
      const storageUsers: RegisterPayload[] = tableUsers ? JSON.parse(tableUsers) : [];
      localStorage.removeItem('loggedUser');

      users.forEach(user => {
        storageUsers[storageUsers.length - 1] === undefined ? user.id = 0 : user.id = storageUsers[storageUsers.length - 1].id + 1;
        storageUsers.push(user);
      });

      localStorage.setItem('users', JSON.stringify(storageUsers));
    }
  }

  public initializePosts(): void {
    const postsList = this.postService.get();

    if (!postsList) {
      const posts: PostProxy[] = [
        {
          id: 0,
          title: 'Curiosidades Rapidas - Plástico',
          type: 2,
          videoUrl: 'OGz3NJEZDQQ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 0,
          title: 'Curiosidades Rapidas - Oleo de Cozinha',
          type: 2,
          videoUrl: 'M6nXp1ibg6Q',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 0,
          title: 'Dicas Sustentáveis - Sabão Caseiro',
          type: 1,
          videoUrl: 'd62LteV7_aM',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]

      const tablePosts = localStorage.getItem('posts');
      const storagePosts: PostProxy[] = tablePosts ? JSON.parse(tablePosts) : [];

      posts.forEach(post => {
        storagePosts[storagePosts.length - 1] === undefined ? post.id = 0 : post.id = storagePosts[storagePosts.length - 1].id + 1;
        storagePosts.push(post);
      });

      localStorage.setItem('posts', JSON.stringify(storagePosts));
    }
  }

}
