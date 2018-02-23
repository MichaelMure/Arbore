// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

class MenuItem extends Component {
  props: {
    name: string,
    open: boolean,
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
    const { classes, name, open, label, accent, badgeValue, children, onClick } = this.props

    if(open) {
      return (
        <div className={classes.wrapper} onClick={onClick}>
          <IconButton color={ accent ? 'accent' : 'default'}>
            { badgeValue > 0
              ? <Badge badgeContent={badgeValue} classes={{badge: classes.badge}}>{children}</Badge>
              : children
            }
          </IconButton>
          <Typography>{label}</Typography>
        </div>
      )
    }

    return (
      <div className={classes.wrapper} onClick={onClick} data-tip data-for={name}>
        <Tooltip id={name} title={label} placement='right'>
          <IconButton color={ accent ? 'accent' : 'default'}>
            { badgeValue > 0
                ? <Badge badgeContent={badgeValue} classes={{badge: classes.badge}}>{children}</Badge>
                : children
            }
          </IconButton>
        </Tooltip>
      </div>
    )
  }
}

const style = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > p': {
      paddingRight: 14,
    }
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red'
  },
  tooltip: {
    fontFamily: 'Roboto'
  }
}

export default withStyles(style)(MenuItem)
