// @flow
import React, { Component } from 'react'
import styles from './Bio.css'
import Typography from 'material-ui/Typography'

class Bio extends Component {

  props: {
    bio: ?string
  }

  render() {
    const { bio } = this.props

    return bio
        ? <Typography paragraph className={styles.bio}>{bio}</Typography>
        : <Typography paragraph className={styles.bioEmpty}>No biography</Typography>
  }
}

export default Bio
