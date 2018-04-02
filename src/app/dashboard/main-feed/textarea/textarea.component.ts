import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import * as moment from 'moment';

import { CustomUpload } from '../../../common/shared/model/custom-upload';
import { Post } from '../../../common/shared/model/post.model';

import { IPost } from '../../../common/shared/interface/post';

import { FirebaseAuthService } from '../../../common/core/services/firebase-auth.service';
import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  upload: File;
  targetFiles: any;
  file: CustomUpload;
  textarea: string;
  isDisabled: boolean = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private firebaseDbService: FirebaseDbService,private snotifyService: SnotifyService) {
    this.textarea = '';
    this.isDisabled = false
  }

  ngOnInit() {
  }

  onChange(event: Event) {

    this.targetFiles = event.target['files'];

    this.upload = Object.values(this.targetFiles)[0];

    if (this.upload.type.includes('image')) {
      this.file = new CustomUpload(this.upload);
    } else {
      console.log(false);
    }

  }

  onPost() {
    this.file = this.targetFiles !== undefined ? this.file = new CustomUpload(this.upload) : undefined;

    const uid = this.firebaseAuthService.uid;
    const _moment = moment().format("dddd/MMMM D, YYYY/h:mm:ss a");
    const _unix = moment().unix();
    const timestamp = `${_moment}.${_unix}`;

    const post = new Post(this.file, uid, this.textarea, timestamp);

    if (post.file === undefined || post.file === null) {
      post.file = null;
      this.firebaseDbService.posts.push(post)
      this.textarea = '';
      this.isDisabled = false;
      this.targetFiles = undefined;
      this.upload = undefined;
      return;
    } else {
      this.onUpload(post);
      this.upload = undefined;
    }

    this.textarea = '';
    this.isDisabled = true
    this.targetFiles = undefined;
  }

  onUpload(post: Post) {
    const successAction = Observable.create((observer) => {

      const uid = this.firebaseAuthService.uid;

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`app-post-images/${post.file.file.name}`).put(post.file.file);

      uploadTask.on('state_changed',
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.RUNNING:
              if (progress !== 0) {
                observer.next({
                  body: `
                    Uploading ${post.file.file.name}.....\n

                    Upload is ${progress.toFixed(2)}% done...
                  `,
                });
              }
              break;
            case firebase.storage.TaskState.PAUSED: break;
            case firebase.storage.TaskState.CANCELED: break;
            case firebase.storage.TaskState.SUCCESS: break;
            case firebase.storage.TaskState.ERROR: break;
          }

        }, (e) => {

        }, () => {

          const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;

          post.file.uid = uid;
          post.file.fileName = post.file.file.name;
          post.file.progress = progress;
          post.file.bytesTransferred = uploadTask.snapshot.bytesTransferred;
          post.file.downloadURL = uploadTask.snapshot.downloadURL;
          post.file.totalBytes = uploadTask.snapshot.totalBytes;

          this.firebaseDbService.posts.push(post)
            .then(() => {
              console.log(post);

              observer.next({
                title: 'Success',
                body: `
                  Post complete!
                `,
                config: {
                  closeOnClick: true,
                  timeout: 2000,
                }
              });

              observer.complete();
              this.isDisabled = false;
            });

        });

    });

    this.snotifyService.async('This will resolve with success', successAction);
  }

  pushUpload() {
  }

}
