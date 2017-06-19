// @flow
import { createAction } from 'redux-actions'
import ShareList from 'models/ShareList'
import Share, { writable as shareWritable } from 'models/Share'
import type { ShareListFilterType } from 'models/ShareList'

export const setFilter = createAction('SHARELIST_FILTER_SET',
  (filter: ShareListFilterType) => (filter)
)
export const setSelected = createAction('SHARELIST_SELECTED_SET',
  (selectedId: number) => (selectedId)
)
export const setSearch = createAction('SHARELIST_SEARCH_SET',
  (search: string) => (search)
)

export const priv = {
  addShare: createAction('SHARELIST_ADD_SHARE',
    (share: Share) => (share)
  )
}

/**
 * Assign an Id and store the share in the Sharelist
 * @param share
 * @returns {Function}
 */
export function addShare(share: Share) {
  return async function(dispatch, getState) {
    const shareList: ShareList = getState().shareList
    const id = shareList.nextId
    share = share.set(shareWritable.id, id)
    dispatch(priv.addShare(share))
    return share
  }
}
