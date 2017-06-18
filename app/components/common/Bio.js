// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import Typography from 'material-ui/Typography'

class Bio extends Component {

  props: {
    bio: ?string
  }

  render() {
    const { classes, bio } = this.props

    return bio
        ? <Typography paragraph className={classes.bio}>{bio}</Typography>
        : <Typography paragraph className={classes.bioEmpty}>No biography</Typography>
  }
}

const styleSheet = createStyleSheet('Bio', theme => ({
  bio: {
    minHeight: 150,
    maxHeight: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.appBar,
    borderRadius: 5,
    marginTop: '10px !important',
    whiteSpace: 'pre-line',
  },
  bioEmpty: {
    minHeight: 150,
    color: 'gray !important',
    backgroundColor: theme.palette.background.appBar,
    borderRadius: 5,
    marginTop: '10px !important',
  }
}))

export default withStyles(styleSheet)(Bio)
