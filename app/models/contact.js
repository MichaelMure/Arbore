export default class contact {

  constructor(name, avatar) {
    this._name = name
    this._avatar = avatar
  }

  get name() {
    return this._name
  }

  get avatar() {
    return this._avatar
  }

}
