import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Upload } from './upload';


@Injectable()
export class AlbumService {

  private basePath:string = '/uploads';
  uploads: AngularFireList<Upload[]>;

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        let snap = snapshot as firebase.storage.UploadTaskSnapshot
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
        return undefined
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }


}
