// @flow
import { createAction } from 'redux-actions'

export const addEmptyObject = createAction('SHARE_EMPTY_OBJECT_ADD',
  (id: number, name: string, hash: string) => ({id, name, hash})
)

export const toggleFavorite = createAction('SHARE_FAVORITE_TOGGLE',
  (id: number) => ({id})
)

export const setTitle = createAction('SHARE_TITLE_SET',
  (id: number, title: string) => ({id, title})
)

