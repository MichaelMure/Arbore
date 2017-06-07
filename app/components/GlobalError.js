// @flow
import React, { Component } from 'react'
import styles from './GlobalError.css'
import GlobalErrorModel from 'models/GlobalError'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import FontAwesome from 'react-fontawesome'

class GlobalError extends Component {

  props: {
    error: ?GlobalErrorModel,
    onCloseClick: () => any
  }

  render() {
    const {error} = this.props

    if(!error) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        <Typography><strong>Error:</strong> {error.text}</Typography>
        <IconButton className={styles.button} onClick={ this.props.onCloseClick }>
          <FontAwesome name='close' />
        </IconButton>
      </div>
    )
  }
}

export default GlobalError
