import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import * as _ from 'lodash';

import { AlbumService } from './album.service';

import { Upload } from './upload';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  private selectedFiles: FileList;
  private currentUpload: Upload;

  public newUploadRef: AngularFireList<any>;
  public newUpload: Observable<any[]>;

  public uploads: AngularFireList<Upload[]>;

  constructor(private db: AngularFireDatabase, private albumService: AlbumService) { }

  ngOnInit() {
    this.newUploadRef = this.db.list('uploads');

    this.newUpload = this.db.list('uploads')
      .snapshotChanges()
      .map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });

  }

  onDetectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onUpload() {
    let files = this.selectedFiles;
    if (_.isEmpty(files)) return;

    let filesIndex = _.range(files.length);

    _.each(filesIndex, (index) => {
      this.currentUpload = new Upload(files[index]);
      this.albumService.pushUpload(this.currentUpload);
    });

  }

  onDownload(name: string) {
    this.albumService.downloadFile(name);
  }

  onDelete(upload: Upload, key: string) {
    this.albumService.deleteUpload(upload, key);
  }

}
