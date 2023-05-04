import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  ) {
    this.user = this.userService.get();
  }

  public user!: UserProxy;

  public postList: PostProxy[] = [];

  public ambientList: PostProxy[] = [];

  public sustentabilityList: PostProxy[] = [];

  public types: typeof FunctionalitiesEnum = FunctionalitiesEnum;

  public async ionViewDidEnter(): Promise<void> {
    if (!this.user) {
      await this.router.navigateByUrl('/login');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }

    this.getPosts();
    this.filterPosts();
  }

  public getPosts(): void {
    this.postList = this.postService.get();
  }

  public filterPosts(): void {
    console.log(this.postList);
    this.postList.forEach(item => {
      item.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(item.videoUrl);

      if (item.type === FunctionalitiesEnum.AMBIENT)
        this.ambientList.push(item);
      else
        this.sustentabilityList.push(item);
    });
    console.log(this.ambientList);
    console.log(this.sustentabilityList);
  }

  public redirectToItem(id: number): void {
    console.log(id);
  }

}
