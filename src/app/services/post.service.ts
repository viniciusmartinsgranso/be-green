import { Injectable } from '@angular/core';
import { UpdateUserPayload } from '../models/payloads/update-user.payload';
import { PostProxy } from '../models/proxies/post.proxy';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public get(): PostProxy[] {
    const post = localStorage.getItem('post');
    return post ? JSON.parse(post) : false;
  }

  public create(post: PostProxy): void {
    const table = localStorage.getItem('posts');
    const storagePosts: PostProxy[] = table ? JSON.parse(table) : [];

    post.id = post.id === 0 ? 1 : storagePosts[storagePosts.length - 1].id + 1;

    storagePosts.push(post);
    localStorage.setItem('posts', JSON.stringify(storagePosts));
  }

  public delete(post: number): void {
    const table = localStorage.getItem('posts');
    const storage: PostProxy[] = table ? JSON.parse(table) : [];

    const newList = storage.filter((postStorage) => {
      if (postStorage.id !== post) {
        return postStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('posts', JSON.stringify(newList));
  }
}
