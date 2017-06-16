// @flow
import { Record } from 'immutable'

export const writable = {
  title: 'title',
  description: 'description',
}

export const ShareMetadataRecord = Record({
  title: '',
  description: '',
}, 'ShareMetadata')

export default class ShareMetadata extends ShareMetadataRecord {
  title: string
  description: string

  static create(title: string, description: string) {
    return new this().withMutations(metadata => metadata
      .set(writable.title, title)
      .set(writable.description, description)
    )
  }
}
