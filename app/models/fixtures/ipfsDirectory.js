// @flow

import IpfsFile from '../IpfsFile'
import IpfsDirectory, { writable } from '../IpfsDirectory'
import randomHash from '../../utils/randomHash'
import randomName from '../../utils/randomName'
import EmptyIpfsObject from '../IpfsObject'

const f1 = IpfsFile.create(randomHash())
const f2 = IpfsFile.create(randomHash())

let d1 = IpfsDirectory.create(randomHash())
d1 = d1.set(writable.children, d1.children.set(randomName(), f1))
d1 = d1.set(writable.children, d1.children.set(randomName(), f2))

let d2 = IpfsDirectory.create(randomHash())
d2 = d2.set(writable.children, d2.children.set(randomName(), d1))
d2 = d2.set(writable.children, d2.children.set(randomName(), f1))
d2 = d2.set(writable.children, d2.children.set(randomName(), f2))

export default d2

export const webui = EmptyIpfsObject.create('/ipfs/QmPhnvn747LqwPYMJmQVorMaGbMSgA7mRRoyyZYz3DoZRQ')
