// @flow
import React, { Component } from 'react'
import IdentityList from 'models/IdentityList'
import styles from './SelectIdentity.css'
import { Avatar } from 'material-ui'
import Identity from 'models/Identity'

class SelectIdentity extends Component {

  props: {
    identities: IdentityList,
    onNewIdentityClick: () => any,
    onIdentityClickGenerator: (identity: Identity) => any,
  }

  renderIdentity(identity: Identity, onClick) {
    return (
      <div key={identity.pubkey} className={styles.identity} onClick={onClick}>
        <Avatar src={identity.avatarData} />
        <span>{identity.identity}</span>
      </div>
    )
  }

  render() {
    const identities = this.props.identities.identities

    return (
      <div>
        {
          identities.valueSeq().map(
            (id: Identity) => this.renderIdentity(id, this.props.onIdentityClickGenerator(id))
          )
        }
        <div className={styles.newIdentity} onClick={ ::this.props.onNewIdentityClick }>
          Create a new identity
        </div>
      </div>
    )
  }
}

export default SelectIdentity
