import * as firebase from 'firebase';

export class CustomUpload {

  file: File;
  uid: string;
  fileName: string;
  progress: number;
  bytesTransferred: number;
  downloadURL: string;
  totalBytes: number;

  constructor(file: File) {
    this.file = file;
  }

}
