import { Component, OnInit, ViewChild } from '@angular/core';
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
export class HomePage implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly helper: HelperService,
    private readonly postService: PostService,
  ) {
    this.user = this.userService.get();
  }

  @ViewChild('sustentabilityVideos')
  public sustentabilityVideos!: HTMLVideoElement[];

  @ViewChild('ambientVideos')
  public ambientVideos!: HTMLVideoElement[];

  public user!: UserProxy;

  public postList: PostProxy[] = [
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 2,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.SUSTENTABILITY,
      title: 'aa',
      videoUrl: '',
      id: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      type: FunctionalitiesEnum.AMBIENT,
      title: 'aa',
      videoUrl: '',
      id: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  public ambientList: PostProxy[] = [];

  public sustentabilityList: PostProxy[] = [];

  public async ngOnInit(): Promise<void> {
    if (this.user.role === 'user') {
      await this.router.navigateByUrl('/learn');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }

    this.getPosts();
    this.filterPosts();
  }

  public async redirectToType(type: string): Promise<void> {
    await this.router.navigate(['/feed', type]);
  }

  public getPosts(): void {
    this.postList = this.postService.get();
    console.log(this.postList);
  }

  public filterPosts(): void {
    this.ambientList = this.postList.filter(item => item.type === FunctionalitiesEnum.AMBIENT);
    console.log(this.ambientList);
    this.sustentabilityList = this.postList.filter(item => item.type === FunctionalitiesEnum.SUSTENTABILITY);
    console.log(this.sustentabilityList);
  }

}
