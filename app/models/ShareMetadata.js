// @flow
import { Record } from 'immutable'

export const writable = {
  title: 'title',
  description: 'description',
  message: 'message',
}

const ShareMetadataRecord = Record({
  title: '',
  description: '',
  message: null,
})

export default class ShareMetadata extends ShareMetadataRecord {
  title: string
  description: string
  message: ?string


  constructor(title: string, description: string, message: ?string) {
    super({title, description, message})
  }
}
