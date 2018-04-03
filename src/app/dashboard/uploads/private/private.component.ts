import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { FirebaseAuthService } from '../../../common/core/services/firebase-auth.service';
import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';
import { SharedService } from '../../../common/core/services/shared.service';
import { SnotifyService } from 'ng-snotify';

import { CustomUpload } from '../../../common/shared/model/custom-upload';
import { Snackbar } from '../../../common/shared/model/snackbar.model';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  @ViewChild('file') fl: ElementRef;

  photos: Observable<any[]>;
  list: FileList;
  index: number = 0;
  totalSize: string = '';
  isDisabled: boolean = false;
  isShow: boolean = false;

  constructor(private db: AngularFireDatabase, private firebaseAuthService: FirebaseAuthService, private firebaseDbService: FirebaseDbService, private sharedService: SharedService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.isDisabled = true;
    this.isShow = false;

    this.photos = this.firebaseDbService.readPrivateAlbum();

    this.photos.subscribe((response) => {
      this.isShow = true;
    });
  }

  onRemovePhoto(photo: any) {
    this.firebaseDbService.removeFile(photo)
  }

  onChange(event: Event) {

    this.list = event.target['files'];

    const bytes = [];
    const list = Object.values(this.list);

    list.forEach((file: File, i: number) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.list[i]['url'] = reader.result;
      }
      reader.readAsDataURL(file);
      bytes.push(file.size);
      if (file.name === this.list.item(i).name) {
        const size = this.sharedService.formatBytes(file.size);
        this.list.item(i)['newSize'] = size;
      }
    })

    const totalSizeInBytes = bytes.length !== 0 ? bytes.reduce((acc, val) => acc + val) : 0;
    this.totalSize = bytes.length !== 0 ? this.sharedService.formatBytes(totalSizeInBytes) : '';

    this.isDisabled = this.list.length === 0 ? true : false;

  }

  onUpload(index: number) {

    this.isDisabled = true;

    const list = Object.values(this.list);
    const config = { timeout: 10000, showProgressBar: false, closeOnClick: true };
    const upload = new CustomUpload(list[index]);

    if (upload.file === undefined) {
      if (this.index !== 0)
        this.snotifyService.success('All data uploaded successfully!', 'Data upload', config);
      this.index = 0;
      this.isDisabled = false;
      this.fl.nativeElement.value = '';
      return;
    }

    this.pushUpload(upload);

  }

  pushUpload(upload: CustomUpload) {

    const successAction = Observable.create(observer => {

      const uid = this.firebaseAuthService.uid;
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`app-uploads/${upload.file.name}`).put(upload.file);

      uploadTask.on('state_changed',
        (snapshot: firebase.storage.UploadTaskSnapshot) => {

          const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.RUNNING:
              if (progress !== 0) {
                observer.next({
                  body: `
                    Uploading ${snapshot.ref.name}.....\n

                    Upload is ${progress.toFixed(2)}% done...

                    ${this.index}/${this.list.length} uploaded
                  `,
                });
              }
              break;
            case firebase.storage.TaskState.PAUSED: break;
            case firebase.storage.TaskState.CANCELED: break;
            case firebase.storage.TaskState.SUCCESS: break;
            case firebase.storage.TaskState.ERROR: break;
          }

        }, (error) => {

          console.log(error)

        }, () => {

          const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;

          upload.uid = uid;
          upload.fileName = upload.file.name;
          upload.progress = progress;
          upload.bytesTransferred = uploadTask.snapshot.bytesTransferred;
          upload.downloadURL = uploadTask.snapshot.downloadURL;
          upload.totalBytes = uploadTask.snapshot.totalBytes;

          upload.file['url'] = '';

          this.db.list(`app-uploads`).push(upload)
            .then(() => {
              observer.next({
                title: 'Success',
                body: `
                  ${upload.file.name} uploaded!

                  ${this.index + 1}/${this.list.length} done.
                `,
                config: {
                  closeOnClick: true,
                  timeout: 2000,
                }
              });

              observer.complete();

              this.index += 1;
              this.onUpload(this.index);
            });

        }
      );

    });

    this.snotifyService.async('This will resolve with success', successAction);

  }

}
