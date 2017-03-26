// @flow
import { Record, List } from 'immutable'
import Share from './Share'

export const writable = {
  list: 'list',
  filter: 'filter'
}

export const ShareListFilter = {
  ALL : 'ALL',
  FAV: 'FAV'
}

const ShareListRecord = Record({
  list: List(),
  filter: ShareListFilter.ALL
})

export default class ShareList extends ShareListRecord {
  list: List<Share>
  filter: ShareListFilter

  get filtered()  {
    switch(this.filter) {
      case ShareListFilter.ALL:
        return this.list.toArray()
      case ShareListFilter.FAV:
        return this.list.toSeq().filter((x : Share) => x.favorite).toArray()
    }
  }
}
