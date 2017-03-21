// @flow

export default class ShareMetadata {
  _title: string
  _description: string
  _message: string

  constructor(title: string, description: string, message: string = "") {
    this._title = title
    this._description = description
    this._message = message
  }

  get title(): string {
    return this._title
  }

  get description(): string {
    return this._description
  }

  get message(): string {
    return this._message
  }
}
