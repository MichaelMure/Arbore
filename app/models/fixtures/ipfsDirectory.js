// @flow

import IpfsFile from '../IpfsFile'
import IpfsDirectory, { writable } from '../IpfsDirectory'

const f1 = new IpfsFile()
const f2 = new IpfsFile()

let d1 = new IpfsDirectory()
d1 = d1.set(writable.children, d1.children.push(f1))
d1 = d1.set(writable.children, d1.children.push(f2))

let d2 = new IpfsDirectory()
d2 = d2.set(writable.children, d1.children.push(d1))
d2 = d2.set(writable.children, d1.children.push(f1))
d2 = d2.set(writable.children, d1.children.push(f2))

export default d2

