// @flow
import { Record, List } from 'immutable'
import Share from './Share'

export const ShareListFilter = {
  ALL : 'ALL',
  FAV: 'FAV'
}
export type ShareListFilterType = $Keys<typeof ShareListFilter>

export const writable = {
  list: 'list',
  filter: 'filter',
  selectedId: 'selectedId'
}

const ShareListRecord = Record({
  list: List(),
  filter: ShareListFilter.ALL,
  selectedId: null
})

export default class ShareList extends ShareListRecord {
  list: List<Share>
  filter: ShareListFilter
  selectedId: ?number

  get filtered() : List<Share> {
    switch(this.filter) {
      case ShareListFilter.ALL:
        return this.list
      case ShareListFilter.FAV:
        return this.list.filter((x : Share) => x.favorite)
    }
  }

  get selected() : ?Share {
    if(this.selectedId == null) {
      return null
    }

    return this.list.find((share: Share) => share.id == this.selectedId)
  }
}
