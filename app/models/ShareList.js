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
  selectedIndex: 'selectedIndex'
}

const ShareListRecord = Record({
  list: List(),
  filter: ShareListFilter.ALL,
  selectedIndex: null
})

export default class ShareList extends ShareListRecord {
  list: List<Share>
  filter: ShareListFilter
  selectedIndex: ?number

  get filtered() : Array<Share> {
    switch(this.filter) {
      case ShareListFilter.ALL:
        return this.list.toArray()
      case ShareListFilter.FAV:
        return this.list.toSeq().filter((x : Share) => x.favorite).toArray()
    }
  }

  get selected() : ?Share {
    if(this.selectedIndex == null) {
      return null
    }

    return this.filtered[this.selectedIndex]
  }
}
