export default class share {

  constructor(title, description, message = "") {
    this._title = title
    this._description = description
    this._message = message
  }

  get title() {
    return this._title
  }

  get description() {
    return this._description
  }

  get message() {
    return this._message
  }

  get progress() {
    return Math.floor(Math.random() * (101));
  }

}
