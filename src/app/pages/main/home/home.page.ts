import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExitAppComponent } from '../../../components/modals/exit-app/exit-app.component';
import { FunctionalitiesEnum } from '../../../models/enums/functionalities.enum';
import { PostProxy } from '../../../models/proxies/post.proxy';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { HelperService } from '../../../services/helper.service';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly helper: HelperService,
    private readonly postService: PostService,
    private readonly sanitizer: DomSanitizer,
    private readonly modalController: ModalController,
  ) {
    this.user = this.userService.get();
  }

  public user!: UserProxy;

  public postList: PostProxy[] = [];

  public ambientList: PostProxy[] = [];

  public sustentabilityList: PostProxy[] = [];

  public types: typeof FunctionalitiesEnum = FunctionalitiesEnum;

  public isAdmin: boolean = false;

  public isCompany: boolean = false;

  public async ionViewDidEnter(): Promise<void> {
    if (!this.user) {
      await this.router.navigateByUrl('/login');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }

    if (this.user.role === 'admin')
      this.isAdmin = true;

    if (this.user.role === 'company')
      this.isCompany = true;


    this.postList = [];

    this.getPosts();
    this.filterPosts();

    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  public getPosts(): void {
    this.postList = this.postService.get();
  }

  public filterPosts(): void {
    this.postList.forEach(item => {
      // item.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(item.videoUrl);

      if (Number(item.type) === FunctionalitiesEnum.AMBIENT)
        this.ambientList.push(item);
      else
        this.sustentabilityList.push(item);
    });
  }

  public redirectToItem(id: number): void {
    console.log(id);
  }

  public async exitModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ExitAppComponent,
      cssClass: 'local-backdrop',
    });

    await modal.present();
  }

}
