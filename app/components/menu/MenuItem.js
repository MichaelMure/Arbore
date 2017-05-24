// @flow
import React, { Component } from 'react'
import styles from './MenuItem.css'
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
    const { name, label, accent, badgeValue, children } = this.props

    return (
      <IconButton accent={accent} data-tip data-for={name} onClick={::this.handleClick}>
        { badgeValue > 0
            ? <Badge badgeContent={badgeValue} badgeClassName={styles.badge}>{children}</Badge>
            : children
        }
        <ReactTooltip ref={(tooltip) => { this.tooltip = tooltip }}
          id={name} place="right" type="dark" effect="solid" delayShow={300} className={styles.tooltip}>
          {label}
        </ReactTooltip>
      </IconButton>
    )
  }
}

export default MenuItem
