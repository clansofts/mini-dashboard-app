import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Observable<any[]>
  user: string = '';

  constructor(private firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
    this.posts = this.firebaseDbService.readPrivatePosts();
  }

  onRemovePost(post: any) {
    this.firebaseDbService.removePost(post);
  }

}
