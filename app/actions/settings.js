// @flow
import { createAction } from 'redux-actions'
import type { ThemeType } from 'models/Settings'

export const setTheme = createAction('SETTINGS_THEME_SET',
  (theme: ThemeType) => (theme)
)
export const setDirectoryPrivacy = createAction('SETTINGS_DIRECTORYPRIVACY_SET',
  (privacy: boolean) => (privacy)
)
