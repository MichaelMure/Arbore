// @flow

export default class GlobalError {
  text: string
  time: number

  constructor(text: string) {
    this.text = text
    this.time = Date.now()
  }
}
