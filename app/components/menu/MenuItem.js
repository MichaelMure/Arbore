// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import ReactTooltip from 'react-tooltip'

class MenuItem extends Component {
  tooltip: ReactTooltip

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

  handleClick() {
    this.tooltip.hideTooltip()
    this.props.onClick()
  }

  render() {
    const { classes, name, label, accent, badgeValue, children } = this.props

    return (
      <IconButton color={ accent ? 'accent' : 'default'} data-tip data-for={name} onClick={::this.handleClick}>
        { badgeValue > 0
            ? <Badge badgeContent={badgeValue} classes={{badge: classes.badge}}>{children}</Badge>
            : children
        }
        <ReactTooltip ref={(tooltip) => { this.tooltip = tooltip }}
          id={name} place='right' type='dark' effect='solid' delayShow={300} className={classes.tooltip}>
          {label}
        </ReactTooltip>
      </IconButton>
    )
  }
}

const styleSheet = createStyleSheet('MenuItem', {
  badge: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red'
  },
  tooltip: {
    fontFamily: 'Roboto'
  }
})

export default withStyles(styleSheet)(MenuItem)
