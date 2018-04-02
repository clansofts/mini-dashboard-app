import { CustomUpload } from '../model/custom-upload';

export interface IPost {
  file: CustomUpload;
  uid: string;
  message: string;
  timestamp: string;
}
