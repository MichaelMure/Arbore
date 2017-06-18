// @flow
import { Record, List } from 'immutable'
import Share from './Share'
import strContain from 'utils/strContain'

export const ShareListFilter = {
  AVAILABLE: 'AVAILABLE',
  INBOX: 'INBOX',
  ACTIVE: 'ACTIVE',
  SHARING: 'SHARING',
  FAV: 'FAV'
}
export type ShareListFilterType = $Keys<typeof ShareListFilter>

export const writable = {
  list: 'list',
  filter: 'filter',
  selectedId: 'selectedId',
  search: 'search'
}

export const ShareListRecord = Record({
  list: List(),
  filter: ShareListFilter.AVAILABLE,
  selectedId: null,
  search: ''
}, 'ShareList')

export default class ShareList extends ShareListRecord {
  list: List<Share>
  // the current filter for the UI
  filter: ShareListFilterType
  // the selected share's id in the UI, if any
  selectedId: ?number
  // the search pattern in the UI
  search: string

  get nextId(): number {
    return this.list.reduce((accu, share: Share) => Math.max(accu, share.id), 0) + 1
  }

  // Filter the Share list with the 'search' string pattern
  get searched() : List<Share> {
    if(this.search === '') {
      return this.list
    }

    return this.list.filter((share : Share) => (
      (share.author ? strContain(share.author.identity, this.search) : false) ||
      strContain(share.description, this.search) ||
      strContain(share.title,       this.search)
    ))
  }

  // Return a list of Shares with all the filter applyed
  get filtered() : List<Share> {
    switch(this.filter) {
      case ShareListFilter.AVAILABLE:
        return this.searched.filter((x: Share) => x.isAvailable)
      case ShareListFilter.INBOX:
        return this.searched.filter((x: Share) => x.isSharing)
      case ShareListFilter.ACTIVE:
        return this.searched.filter((x: Share) => x.isDownloading || x.isPaused)
      case ShareListFilter.SHARING:
        return this.searched.filter((x: Share) => x.isAuthor || x.isSharing)
      case ShareListFilter.FAV:
        return this.searched.filter((x : Share) => x.favorite)
    }
  }

  // Return the selected share, if any
  get selected() : ?Share {
    if(this.selectedId === null) {
      return null
    }

    return this.list.find((share: Share) => share.id === this.selectedId)
  }

  get available() : number {
    return this.list.filter((x: Share) => x.isAvailable).count()
  }

  get inbox() : number {
    return this.list.filter((x: Share) => x.isSharing).count()
  }

  get active() : number {
    return this.list.filter((x: Share) => x.isDownloading || x.isPaused).count()
  }

  get sharing() : number {
    return this.list.filter((x: Share) => x.isAuthor || x.isSharing).count()
  }

  get favorite() : number {
    return this.list.filter((x : Share) => x.favorite).count()
  }

  idInFiltered(id: number) : boolean {
    return this.filtered.some((share: Share) => share.id === id)
  }
}
