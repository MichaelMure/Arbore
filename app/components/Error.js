// @flow
import React, { Component } from 'react'
import styles from './Error.css'
import Typography from 'material-ui/Typography'

class Error extends Component {

  render() {
    const { children } = this.props

    const text = (typeof children === 'string')
      ? children
      : children.toString()

    return (
      <Typography className={styles.error}>
        <strong>Error:</strong> {text}
      </Typography>
    )
  }
}

export default Error
