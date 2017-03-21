// @flow

// import IpfsObject from '../IpfsObject'
import IpfsFile from '../IpfsFile'
import IpfsDirectory from '../IpfsDirectory'

const f1 = new IpfsFile()
const f2 = new IpfsFile()

const d1 = new IpfsDirectory()
d1.addChildren(f1)
d1.addChildren(f2)

const d2 = new IpfsDirectory()
d2.addChildren(d1)
d2.addChildren(f1)
d2.addChildren(f2)

export default d2

