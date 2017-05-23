// @flow
import crypto from 'crypto'

const secret = crypto.randomBytes(128).toString('hex')
let counter = 0

// Hey random guy from the internet, does that make sense ?
export function nextToken() {
  counter++

  return crypto.createHash('sha256')
    .update(secret)
    .update(counter.toString())
    .digest('hex')
    .slice(-32)
}
