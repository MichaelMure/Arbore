// @flow

import { Map } from 'immutable'

export type Action = {
  type: string,
  payload: any,
  error: ?boolean
}

export type Store = {
  counter: any,
  profile: Map,
  ui: Map,
  routing: any
}
