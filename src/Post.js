import logo from './assets/logo.png';

export class Post {
  constructor(title) {
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