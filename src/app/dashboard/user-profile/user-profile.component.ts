import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'


import { User } from '../../core/shared/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user: User;
  public newPostRef: AngularFireList<any>;
  public newPost: Observable<any[]>;

  constructor(private route: ActivatedRoute,private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    const uid = this.afAuth.auth.currentUser['uid'];

    this.route.data.subscribe( (response: Data) => {
      this.user = response.data;
    });

    this.newPost = this.db.list('/post', (ref: any) => {
      return ref.orderByChild('user_uid').equalTo(uid)
    }).valueChanges();
  }

}
