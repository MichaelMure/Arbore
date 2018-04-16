// @flow
import { Record } from 'immutable'
import { gatewayRoot } from 'ipfs/index'
import { nextToken } from 'utils/tokenGenerator'
import * as bcrypt from 'bcryptjs'

export const LOCAL_DATA_VERSION = 1
export const PUBLISH_DATA_VERSION = 1

const bcryptRound = 10
export const PROFILE_PUBLISH_PERIOD = 2 * 60 * 1000 // 2 minutes

export const ConnectivityStatus = {
  BAD: 'BAD',
  WARNING: 'WARNING',
  GOOD: 'GOOD',
}
export type ConnectivityStatusType = $Keys<typeof ConnectivityStatus>

export const writable = {
  dataVersion: 'dataVersion',
  storageKey: 'storageKey',
  hash: 'hash',
  identity: 'identity',
  bio: 'bio',
  pubkey: 'pubkey',
  password: 'password',
  avatarHash: 'avatarHash',
  lastPublish: 'lastPublish',
  lastPublished: 'lastPublished',
}

export const ProfileRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  storageKey: null,
  hash: null,
  identity: '',
  bio: '',
  pubkey: null,
  password: null,
  avatarHash: null,
  lastPublish: null,
  lastPublished: null,
}, 'Profile')

export default class Profile extends ProfileRecord {
  dataVersion: number
  // storage key in redux-persist
  storageKey: string
  // hash of the published in ipfs profile's data, if published
  hash: ?string
  // Displayed name of the user
  identity: string
  bio: string
  // Arbore ID, or stringified public key of the user
  pubkey: string
  password: ?string
  // hash of the avatar file, if any
  avatarHash: ?string
  // time when the profile last publish was attempted
  lastPublish: ?number
  // time when the profile was last successfuly published
  lastPublished: ?number

  static create(identity: string, password: ?string, bio: string) {
    return new this().withMutations(profile => profile
      .set(writable.storageKey, nextToken(16))
      .set(writable.identity, identity)
      .set(writable.password, password ? Profile.hashPassword(password) : null)
      .set(writable.bio, bio)
    )
  }

  // Return the object to be published in IPFS
  publishObject(peerID: string): {} {
    return {
      dataVersion: PUBLISH_DATA_VERSION,
      identity: this.identity,
      bio: this.bio,
      pubkey: this.pubkey,
      avatarHash: this.avatarHash,
      peerID: peerID
    }
  }

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }

  get initials(): string {
    const names = this.identity.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  get chatPubsubTopic(): string {
    return this.pubkey + '/chat'
  }

  get contactsPubsubTopic() : string {
    return this.pubkey + '/contacts'
  }

  get sharesPubsubTopic() : string {
    return this.pubkey + '/shares'
  }

  get contactDiscoveryPubsubTopic() : string {
    return this.pubkey + '/contactDiscovery'
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcryptRound)
  }

  async checkPassword(password: string) {
    return bcrypt.compare(password, this.password)
  }

  // Return an approximative connectivity status based on the quality of the
  // (ipns based) profile publish process
  get connectivityStatus() : ConnectivityStatusType {
    const now = Date.now()

    if(now - this.lastPublished < 2 * PROFILE_PUBLISH_PERIOD) {
      return ConnectivityStatus.GOOD
    }

    if(now - this.lastPublish > PROFILE_PUBLISH_PERIOD) {
      return ConnectivityStatus.BAD
    }

    return ConnectivityStatus.WARNING
  }
}
