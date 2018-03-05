// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'

export const createNewIdentity = createAction('IDENTITY_CREATE',
  (identity: Identity) => (identity)
)
export const setAvatarHash = createAction('IDENTITY_AVATAR_SET',
  (storageKey: string, avatarHash: ?string) => ({storageKey, avatarHash})
)
export const setHasPassword = createAction('IDENTITY_HASPASSWORD_SET',
  (storageKey: string, hasPassword: boolean) => ({storageKey, hasPassword})
)
