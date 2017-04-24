// @flow
import React, { Component } from 'react'
import IdentityList from 'models/IdentityList'
import styles from './LoginPage.css'
import Identity from 'models/Identity'
import { Avatar } from 'material-ui'

class LoginPage extends Component {

  props: {
    identities: IdentityList,
    onIdentityClickGenerator: (identity: Identity) => any
  }

  renderIdentity(identity: Identity) {
    return (
      <div
        key={identity.pubkey}
        className={styles.identity}
        onClick={this.props.onIdentityClickGenerator(identity)}
      >
        <Avatar src={identity.avatarData} />
        <span>{identity.identity}</span>
      </div>
    )
  }

  render() {

    const identities = this.props.identities.identities.valueSeq().map(
      (id: Identity) => ::this.renderIdentity(id)
    )

    return (
      <div className={styles.wrapper}>
        <img src="../resources/logo.svg" className={styles.logo} />

        { identities }
      </div>
    )
  }
}

export default LoginPage
