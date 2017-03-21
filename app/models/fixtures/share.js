import Share from '../Share'
import contactFxt from './contact'
import metadataFxt from './shareMetadata'

export default [
  new Share(contactFxt[0], metadataFxt[2]),
  new Share(contactFxt[1], metadataFxt[3]),
  new Share(contactFxt[2], metadataFxt[0]),
  new Share(contactFxt[3], metadataFxt[3]),
  new Share(contactFxt[0], metadataFxt[0]),
  new Share(contactFxt[1], metadataFxt[1]),
  new Share(contactFxt[2], metadataFxt[2]),
  new Share(contactFxt[3], metadataFxt[1]),
]
