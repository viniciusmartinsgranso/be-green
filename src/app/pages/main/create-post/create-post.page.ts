import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { HelperService } from '../../../services/helper.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly helper: HelperService,
  ) {
    this.user = this.userService.get();
  }

  public user!: UserProxy;

  public async ngOnInit(): Promise<void> {
    if (this.user.role === 'user') {
      await this.router.navigateByUrl('/learn');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }
  }

}
