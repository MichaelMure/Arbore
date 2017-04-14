// @flow
import { createAction } from 'redux-actions'
import type { PageType } from '../models/UiState'

export const openProfile = createAction('UI_PROFILE_OPEN')
export const closeProfile = createAction('UI_PROFILE_CLOSE')
export const toggleProfile = createAction('UI_PROFILE_TOGGLE')

export const setPage = createAction('UI_PAGE_SET',
  (page: PageType) => (page)
)
