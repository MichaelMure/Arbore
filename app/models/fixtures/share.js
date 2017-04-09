import Share, { writable } from '../Share'
import contactFxt from './contact'
import metadataFxt from './shareMetadata'
import { webui } from './ipfsDirectory'
import randomName from '../../utils/randomName'

const shares = [
  new Share(contactFxt[0], metadataFxt[2]),
  new Share(contactFxt[1], metadataFxt[3]),
  new Share(contactFxt[2], metadataFxt[0]),
  new Share(contactFxt[3], metadataFxt[3]),
  new Share(contactFxt[0], metadataFxt[0]),
  new Share(contactFxt[1], metadataFxt[1]),
  new Share(contactFxt[2], metadataFxt[2]),
  new Share(contactFxt[3], metadataFxt[1]),
]

shares[0] = shares[0].set(writable.content, shares[0].content.set(randomName(), webui))
// shares[1] = shares[1].set(writable.content, shares[1].content.set(randomName(), webui))
// shares[2] = shares[2].set(writable.content, shares[2].content.set(randomName(), webui))
// shares[3] = shares[3].set(writable.content, shares[3].content.set(randomName(), webui))
// shares[4] = shares[4].set(writable.content, shares[4].content.set(randomName(), webui))
// shares[5] = shares[5].set(writable.content, shares[5].content.set(randomName(), webui))
// shares[6] = shares[6].set(writable.content, shares[6].content.set(randomName(), webui))

export default shares
