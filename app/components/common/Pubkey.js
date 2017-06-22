// @flow
import React, { Component } from 'react'
import styles from './Pubkey.css'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'

const { clipboard } = require('electron')

class Pubkey extends Component {

  props: {
    pubkey: string
  }

  handlePubkeyToClipboard() {
    clipboard.writeText(this.props.pubkey)
  }

  render() {
    const { pubkey } = this.props

    return (
      <Typography className={styles.pubkey} align="center" gutterBottom>
        {pubkey}
        <IconButton className={styles.copyToClipboard} onClick={::this.handlePubkeyToClipboard}>
          <FontAwesome name="clipboard" />
        </IconButton>
      </Typography>
    )
  }
}

export default Pubkey
