// @flow
import React, { Component } from 'react'
import styles from './Error.css'
import Typography from 'material-ui/Typography'

class Error extends Component {

  render() {
    return (
      <Typography className={styles.error}>
        <strong>Error:</strong> {this.props.children}
      </Typography>
    )
  }
}

export default Error
