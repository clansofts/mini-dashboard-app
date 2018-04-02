import { CustomUpload } from './custom-upload';

export class Post {
  constructor(
    public file: CustomUpload,
    public uid: string,
    public message: string,
    public timestamp: string,
  ) {}
}
