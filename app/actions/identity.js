// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'

export const createNewIdentity = createAction('IDENTITYLIST_IDENTITY_CREATE',
  (identity: Identity) => (identity)
)
export const setAvatarHash = createAction('IDENTITYLIST_IDENTITY_AVATAR_SET',
  (storageKey: string, avatarHash: ?string) => ({storageKey, avatarHash})
)
