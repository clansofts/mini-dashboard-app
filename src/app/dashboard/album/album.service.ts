import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Upload } from './upload';


@Injectable()
export class AlbumService {

  private basePath:string = '/uploads';

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        let snap = snapshot as firebase.storage.UploadTaskSnapshot;
        if (!(
                upload.file.name.includes('.txt') || upload.file.name.includes('.gitkeep')
            )) {
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload);
      }
    );
  }

  downloadFile(name: string) {
    const storageRef = firebase.storage().ref();
    var starsRef = storageRef.child(`${this.basePath}/${name}`);

    starsRef.getDownloadURL().then((url) => {
      window.open(url, '_blank');
    });

  }

  deleteUpload(upload: Upload, key: string) {
    this.deleteFileData(key).then(() => {
      this.deleteFileStorage(upload.name)
    })
  }


  // HELPERS

  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
