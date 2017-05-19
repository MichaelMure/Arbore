// @flow
import React, { Component } from 'react'
import styles from './SelectIdentity.css'
import IdentityList from 'models/IdentityList'
import Identity from 'models/Identity'
import Avatar from 'components/Avatar'

class SelectIdentity extends Component {

  props: {
    identities: IdentityList,
    onNewIdentityClick: () => any,
    onIdentityClickGenerator: (identity: Identity) => any,
  }

  renderIdentity(identity: Identity, onClick) {
    return (
      <div key={identity.storageKey} className={styles.identity} onClick={onClick}>
        <Avatar person={identity} />
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
