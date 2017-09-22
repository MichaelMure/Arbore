// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'

class MenuItem extends Component {
  props: {
    name: string,
    label: string,
    accent: boolean,
    badgeValue: ?number,
    onClick: () => any,
  }

  static defaultProps = {
    badgeValue: null,
    accent: false
  }

  render() {
    const { classes, name, label, accent, badgeValue, children, onClick } = this.props

    return (
      <Tooltip id={name} title={label} placement='right'>
        <IconButton color={ accent ? 'accent' : 'default'} data-tip data-for={name} onClick={onClick}>
          { badgeValue > 0
              ? <Badge badgeContent={badgeValue} classes={{badge: classes.badge}}>{children}</Badge>
              : children
          }
        </IconButton>
      </Tooltip>
    )
  }
}

const style = {
  badge: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red'
  },
  tooltip: {
    fontFamily: 'Roboto'
  }
}

export default withStyles(style)(MenuItem)
