import Share from '../Share'
import contactFxt from './contact'
import metadataFxt from './shareMetadata'
import dirFxt from './ipfsDirectory'

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

shares[0].addObject(dirFxt)
shares[1].addObject(dirFxt)
shares[2].addObject(dirFxt)
shares[3].addObject(dirFxt)
shares[4].addObject(dirFxt)
shares[5].addObject(dirFxt)
shares[6].addObject(dirFxt)

export default shares
