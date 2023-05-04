import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionalitiesEnum, translatedFunctionabilities } from '../../../models/enums/functionalities.enum';
import { PostProxy } from '../../../models/proxies/post.proxy';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { HelperService } from '../../../services/helper.service';
import { PostService } from '../../../services/post.service';
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
    private readonly postService: PostService,
  ) {
    this.user = this.userService.get();
  }

  public user!: UserProxy;

  public post: PostProxy = {
    id: 0,
    title: '',
    type: 0,
    videoUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  public functionalities: typeof FunctionalitiesEnum = FunctionalitiesEnum;

  public translate: Record<FunctionalitiesEnum, string> = translatedFunctionabilities;

  public async ngOnInit(): Promise<void> {
    if (this.user.role === 'user') {
      await this.router.navigateByUrl('/home');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }
  }

  public getBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.post.videoUrl = reader.result.toString();
    };
    reader.onerror = async error => {
      await this.helper.showToast(String(error));
    };
  }

  public async onSubmit(): Promise<void> {
    console.log(this.post);
    this.postService.create(this.post);
    await this.helper.showToast('Postagem criada com sucesso!');
  }

}
