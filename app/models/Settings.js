// @flow
import { Record } from 'immutable'

export const Theme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}
export type ThemeType = $Keys<typeof Theme>

export const writable = {
  theme: 'theme',
  directoryPrivacy: 'directoryPrivacy',
  autoAddContactBack: 'autoAddContactBack',
}

export const SettingsRecord = Record({
  theme: Theme.LIGHT,
  directoryPrivacy: false,
  autoAddContactBack: true
}, 'Settings')

export default class Settings extends SettingsRecord {
  theme: ThemeType
  directoryPrivacy: boolean
  autoAddContactBack: boolean
}
