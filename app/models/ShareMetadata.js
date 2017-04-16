// @flow
import { Record } from 'immutable'

export const writable = {
  title: 'title',
  description: 'description',
  message: 'message',
}

export const ShareMetadataRecord = Record({
  title: '',
  description: '',
  message: null,
}, 'ShareMetadata')

export default class ShareMetadata extends ShareMetadataRecord {
  title: string
  description: string
  message: ?string

  static create(title: string, description: string, message: ?string) {
    return new this().withMutations(metadata => metadata
      .set(writable.title, title)
      .set(writable.description, description)
      .set(writable.message, message)
    )
  }
}
