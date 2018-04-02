export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: string,
    public gender: string,
    public email: string,
    public password: string,
    public uid?: string,
  ) {}
}
