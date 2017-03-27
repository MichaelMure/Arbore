// @flow
import { createAction } from 'redux-actions'

export const addObject = createAction('SHARE_OBJECT_ADD')


export const toggleFavorite = createAction('SHARE_FAVORITE_TOGGLE',
  (id: number) => ({id})
)

export const setTitle = createAction('SHARE_TITLE_SET',
  (id: number, title: string) => ({id, title})
)

