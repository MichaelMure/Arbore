// @flow
import { Record, List } from 'immutable'
import Share, { ShareState } from './Share'

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

const ShareListRecord = Record({
  list: List(),
  filter: ShareListFilter.AVAILABLE,
  selectedId: null,
  search: ''
})

export default class ShareList extends ShareListRecord {
  list: List<Share>
  filter: ShareListFilterType
  selectedId: ?number
  search: string

  // Filter the Share list with the 'search' string pattern
  get searched() : List<Share> {
    if(this.search === '') {
      return this.list
    }

    return this.list.filter((share : Share) => (
      strContain(share.author.name,          this.search) ||
      strContain(share.metadata.description, this.search) ||
      strContain(share.metadata.message,     this.search) ||
      strContain(share.metadata.title,       this.search)
    ))
  }

  // Return a list of Shares with all the filter applyed
  get filtered() : List<Share> {
    switch(this.filter) {
      case ShareListFilter.AVAILABLE:
        return this.searched.filter((x: Share) => x.status === ShareState.AVAILABLE)
      case ShareListFilter.INBOX:
        return this.searched.filter((x: Share) => x.status === ShareState.SHARING)
      case ShareListFilter.ACTIVE:
        return this.searched.filter((x: Share) => x.status === ShareState.DOWNLOADING || x.status === ShareState.PAUSED)
      case ShareListFilter.SHARING:
        return this.searched.filter((x: Share) => x.status === ShareState.AUTHOR || x.status === ShareState.SHARING)
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
    return this.list.filter((x: Share) => x.status === ShareState.AVAILABLE).count()
  }

  get inbox() : number {
    return this.list.filter((x: Share) => x.status === ShareState.SHARING).count()
  }

  get active() : number {
    return this.list.filter((x: Share) => x.status === ShareState.DOWNLOADING || x.status === ShareState.PAUSED).count()
  }

  get sharing() : number {
    return this.list.filter((x: Share) => x.status === ShareState.AUTHOR || x.status === ShareState.SHARING).count()
  }

  get favorite() : number {
    return this.list.filter((x : Share) => x.favorite).count()
  }

  idInFiltered(id: number) : boolean {
    return this.filtered.some((share: Share) => share.id === id)
  }
}

/**
 * Helper to find if a string contains a pattern (case insensitive).
 * Handle the null string case.
 */
function strContain(str : ?string, pattern : string) : boolean {
  return (!!str) && (str.search(new RegExp(pattern, 'i')) !== -1)
}
