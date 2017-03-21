// @flow
import multihash from 'multihashes'
import crypto from 'crypto'

export default () => {
  const data = crypto.randomBytes(20).toString('hex')
  const buf = new Buffer(data, 'hex')
  return multihash.encode(buf, 'sha1')
}
