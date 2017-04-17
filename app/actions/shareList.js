// @flow
import { createAction } from 'redux-actions'
import Share from 'models/Share'
import type { ShareListFilterType } from 'models/ShareList'

export const addShare = createAction('SHARELIST_ADD',
  (share: Share) => (share)
)
export const setFilter = createAction('SHARELIST_FILTER_SET',
  (filter: ShareListFilterType) => (filter)
)
export const setSelected = createAction('SHARELIST_SELECTED_SET',
  (selectedId: number) => (selectedId)
)
export const setSearch = createAction('SHARELIST_SEARCH_SET',
  (search: string) => (search)
)
