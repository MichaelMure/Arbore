// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

class Error extends Component {

  render() {
    const { classes, children } = this.props

    const text = (typeof children === 'string')
      ? children
      : children.toString()

    return (
      <Typography className={classes.error}>
        <strong>Error:</strong> {text}
      </Typography>
    )
  }
}

const styleSheet = createStyleSheet('Error', theme => ({
  error: {
    backgroundColor: '#f2dede',
    marginTop: '10px !important',
    color: '#a94442 !important',
    paddingLeft: 10,
    borderRadius: 4,
  }
}))

export default withStyles(styleSheet)(Error)
