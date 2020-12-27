import * as logo from './assets/logo.png';

export class Post {
  private date: Date
  private img: any

  constructor(private title: string) {
    this.title = title;
    this.date = new Date();
    this.img = logo;
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
      img: this.img,
    }, null, 2);
  }
}