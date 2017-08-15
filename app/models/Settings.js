// @flow
import { Record } from 'immutable'

export const Theme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}
export type ThemeType = $Keys<typeof Theme>

export const writable = {
  theme: 'theme'
}

export const SettingsRecord = Record({
  theme: Theme.LIGHT
}, 'Settings')

export default class Settings extends SettingsRecord {
  theme: ThemeType
}
