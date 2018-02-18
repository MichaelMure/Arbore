// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

class Error extends Component {

  props: {
    className: any
  }

  render() {
    const { classes, className, children } = this.props

    const text = (typeof children === 'string')
      ? children
      : children.toString()

    return (
      <Typography className={classes.error + ' ' + className}>
        <strong>Error:</strong> {text}
      </Typography>
    )
  }
}

const style = theme => {

  const backgroundColor = theme.palette.error[300]
  const textColor = theme.palette.getContrastText(backgroundColor)

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
