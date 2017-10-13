import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'

import { User } from '../../core/shared/user';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private key: string;

  public isPostClick: boolean = false;
  public isGoingToUpdate: boolean = false;

  public newPostRef: AngularFireList<any>;
  public newPost: Observable<any[]>;

  public documentForm: FormGroup;
  public tags: string[] = [];

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private route: ActivatedRoute) { }

  ngOnInit() {
    this.documentForm = new FormGroup({
      'title': new FormControl(null),
      'imgUrl': new FormControl(null),
      'description': new FormControl(null),
      'tags': new FormControl(null)
    });

    this.newPostRef = this.db.list('post');

    this.newPost = this.db.list('post')
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  onAddTag() {
    const tag = this.documentForm.value['tags'];
    this.tags.push(tag);

    this.documentForm.patchValue({
      'tags': ''
    });
  }

  onRemoveTag(index: number) {
    this.tags.splice(index, 1);

    this.documentForm.patchValue({
      'tags': ''
    });
  }

  onPost() {
    this.isPostClick = !this.isPostClick ? true : false;
    // this.isPostClick = true;
  }

  onCancelPost() {
    this.isPostClick = false;
    this.isGoingToUpdate = true;
    this.empty();
  }

  onCreatePost() {
    this.isPostClick = false;
    this.newPostRef.push(this.post);
  }

  onUpdate(key: string, post: any) {
    this.key = key;
    this.isPostClick = true;
    this.documentForm.patchValue({
      'title': post.title,
      'imgUrl': post.imgUrl,
      'description': post.description,
      'tags': post.tags
    })
    this.isGoingToUpdate = true;
  }

  onUpdatePost() {
    const updatedPost = {
      title: this.documentForm.controls['title'].value,
      imgUrl: this.documentForm.controls['imgUrl'].value,
      description: this.documentForm.controls['description'].value,
      tags: this.tags,
    }
    this.newPostRef.update(this.key, updatedPost);
    this.isGoingToUpdate = false;
    this.isPostClick = false;
    this.empty();
  }

  onDeletePost(key: string) {
    this.newPostRef.remove(key);
    this.isPostClick = false;
    this.empty();
  }

  private get post() {
    const authState = this.afAuth.auth.currentUser;
    const post = this.documentForm.value;
    post['tags'] = this.tags;
    post['user_uid'] = authState['uid'];
    let fullName = '';
    this.route.data.subscribe( (response: Data) => {
       fullName = response.data['fullName'];
    });
    post['user_fullName'] = fullName;

    return post;
  }

  private empty() {
    this.documentForm.patchValue({
      'title': '',
      'imgUrl': '',
      'description': '',
      'tags': ''
    })
    this.tags = [];
  }

}
