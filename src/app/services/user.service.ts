import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { CreateUserPayload, RegisterPayload } from '../models/payloads/create-user.payload';
import { LoginPayload } from '../models/payloads/login.payload';
import { UpdateUserPayload } from '../models/payloads/update-user.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly router: Router,
    private readonly helper: HelperService,
    private readonly db: AngularFireDatabaseModule,
  ) { }

  public user: CreateUserPayload[] = [
    {
      name: '',
      password: '',
      email: '',
      role: '',
      id: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  public get(): UserProxy {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : false;
  }

  public getUsers(): UserProxy[] {
    const user = localStorage.getItem('users');
    return user ? JSON.parse(user) : false;
  }

  public create(user: RegisterPayload): boolean {
    const table = localStorage.getItem('users');
    const storageUsers: RegisterPayload[] = table ? JSON.parse(table) : [];

    const haveUserWithSameEmail = storageUsers.find(item => item.email === user.email);

    if (haveUserWithSameEmail)
      return false;

    localStorage.removeItem('loggedUser');
    storageUsers[storageUsers.length - 1] === undefined ? user.id = 0 : user.id = storageUsers[storageUsers.length - 1].id + 1;

    user.points = 0;

    storageUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storageUsers));
    localStorage.setItem('loggedUser', JSON.stringify(user));
    return true;
  }

  public update(user: UpdateUserPayload): void {
    const table = localStorage.getItem('users');
    const storageUsers = table ? JSON.parse(table) : [];

    const newUser = storageUsers.filter((us: RegisterPayload) => {
      if (us.id === user.id) {
        us.name = user.name;
        us.email = user.email;
        us.confirmEmail = user.email;
        us.password = user.email;
        us.confirmPassword = user.password;
        return us;
      } else {
        return [];
      }
    });

    storageUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storageUsers));
    localStorage.setItem('loggedUser', JSON.stringify(storageUsers));
  }

  public delete(user: number): void {
    const table = localStorage.getItem('users');
    const storage: UpdateUserPayload[] = table ? JSON.parse(table) : [];

    const newList = storage.filter((userStorage) => {
      if (userStorage.id !== user) {
        return userStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('users', JSON.stringify(newList));
    localStorage.removeItem('loggedUser');
  }

  public updateUserPoints(user: UserProxy, points: number): void {
    const table = localStorage.getItem('users');
    const storageUsers = table ? JSON.parse(table) : [];

    const newUser = storageUsers.find((us: UserProxy) => {
      if (us.id === user.id) {
        us.points = user.points;
        return us;
      }
      else {
        return;
      }
    });

    const newList = storageUsers.filter((userStorage: UserProxy) => {
      if (userStorage.id !== user.id) {
        return userStorage;
      } else return false;
    });

    if (!newUser)
      return void this.helper.showToast('Ocorreu um erro, tente novamente mais tarde.');

    const pushList: any[] = [];
    pushList.push(newUser);
    pushList.push(...newList)
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(pushList));
  }

  // public async deleteUser(options: AlertOptionsInterface, user: UpdateUserPayload): Promise<void> {
  //   await this.helperService.createAlert({
  //     header: options.header,
  //     message: options.message,
  //     cssClass: ['alert-wrapper', 'alert-title', 'alert-1-msg', 'alert-button'],
  //     buttons: [
  //       {
  //         text: 'Deseja realmente excluir sua conta?',
  //         handler: async () => {
  //           await this.delete(user.id);
  //           await this.modalController.dismiss();
  //           await this.router.navigateByUrl('/login#login');
  //           setTimeout(async () => {
  //
  //             await this.helperService.createToast({
  //               message: 'Usuário deletado com sucesso',
  //               position: 'bottom',
  //               duration: 2000,
  //             });
  //           }, 500);
  //         },
  //       },
  //       {
  //         text: 'Não! Cliquei sem querer hehe',
  //       },
  //     ],
  //   });
  // }

  public async login(user: LoginPayload): Promise<boolean> {
    localStorage.removeItem('loggedUser');
    const table = localStorage.getItem('users');
    const storage: LoginPayload[] = table ? JSON.parse(table) : false;

    if (!storage.length) return false;

    const loggedUser = storage.find(currentUser => {
      return currentUser.email === user.email && currentUser.password === user.password;
    });

    if (!loggedUser) return false;

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    return true;
  }

  public async logoutUser(): Promise<void> {
    localStorage.removeItem('loggedUser');
    return void await this.router.navigateByUrl('/login');
  }

}
