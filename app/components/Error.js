// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

class Error extends Component {

  props: {
    className: any,
    children: any,
  }

  extractError(value) {
    if(typeof value === 'string') {
      return value
    }

    if(typeof value === 'object') {
      if(value.error !== undefined) { return value.error }
      if(value.statusMessage !== undefined) { return value.statusMessage }
      if(value.text !== undefined) { return value.text }
      if(value.name !== undefined) { return value.name }

      return JSON.stringify(value)
    }

    return 'unknown error'
  }

  render() {
    const { classes, className, children } = this.props

    return (
      <Typography className={classes.error + ' ' + className}>
        <strong>Error:</strong> {this.extractError(children)}
      </Typography>
    )
  }
}

const style = theme => {

  const backgroundColor = theme.palette.error.main
  const textColor = theme.palette.error.contrastText

  return {
    error: {
      backgroundColor: backgroundColor,
      marginTop: '10px !important',
      color: textColor + ' !important',
      paddingLeft: 10,
      borderRadius: 4,
    }
  }
}

export default withStyles(style)(Error)
