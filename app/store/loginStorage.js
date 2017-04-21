// @flow
import type { Storage } from 'redux-persist'

export default class LoginStorage {
  _storage: Storage
  _commonPrefix: string
  _commonKeys: [string]
  _dynPrefix: ?string

  constructor(storage: Storage, commonKeys: [string], dynPrefix: string = '@garbage') {
    this._storage = storage
    this._commonPrefix = 'common:'
    this._commonKeys = commonKeys
    this._dynPrefix = '@' + dynPrefix + ':'
  }

  set dynPrefix(dynPrefix: string) {
    this._dynPrefix = '@' + dynPrefix + ':'
  }

  setItem (key: string, value: any, onComplete) {
    return this._storage.setItem(this._mapKey(key), value, onComplete)
  }

  getItem (key: string, onComplete) {
    return this._storage.getItem(this._mapKey(key), onComplete)
  }

  removeItem (key: string, onComplete) {
    return this._storage.removeItem(this._mapKey(key), onComplete)
  }

  getAllKeys (onComplete) {
    return this._storage.getAllKeys()
      .then(keys => keys.map(
          key => this._unmapKey(key)
        ).filter(val => val !== null)
      )
      .then(results => {
        if(onComplete) {
          onComplete(null, results)
        }
      })
  }

  _mapKey(key: string) : string {
    return this._commonKeys.includes(key) ?
      this._commonPrefix + key :
      this._dynPrefix + key
  }

  _unmapKey(key: string) : ?string {
    if(key.startsWith(this._commonPrefix)) {
      return key.slice(this._commonPrefix.length)
    } else if(key.startsWith(this._dynPrefix)) {
      return key.slice(this._dynPrefix.length)
    }

    // Ignore other keys
    return null
  }
}
