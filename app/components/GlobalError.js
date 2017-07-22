// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
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
    const { classes, error, onCloseClick } = this.props

    if(!error) {
      return null
    }

    return (
      <div className={classes.wrapper}>
        <Typography><strong>Error:</strong> {error.text}</Typography>
        <IconButton className={classes.button} onClick={ onCloseClick }>
          <FontAwesome name='close' />
        </IconButton>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('GlobalError', theme => ({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '70%',
    margin: '0 auto 20px',
    left: 0,
    right: 0,
    backgroundColor: '#f2dede',
    paddingLeft: 10,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  text: {
    marginTop: '10px !important',
    color: '#a94442 !important',
  },
  button: {
    width: '30px !important',
    height: '30px !important',
  }
}))

export default withStyles(styleSheet)(GlobalError)
