// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import classNames from 'classnames'

class Drawer extends Component {

  props: {
    onBackgroundClick: () => void,
    open: boolean,
    big: boolean
  };

  static defaultProps = {
    open: false
  };

  render() {
    const { classes } = this.props

    const overlayClass = classNames(classes.overlay, {
      [classes.overlayOpen]: this.props.open
    })

    const drawerClass = classNames(classes.drawer, {
      [classes.drawerOpen]: this.props.open,
      [classes.drawerSmall]: !this.props.big,
      [classes.drawerBig]: this.props.big
    })

    return (
      <div className={classes.wrapper}>
        <div className={overlayClass} onClick={this.props.onBackgroundClick}/>
        <div className={drawerClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


const styleSheet = createStyleSheet('Drawer', theme => ({
  wrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    zIndex: 5,
    pointerEvents: 'none'
  },
  drawer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    backgroundColor: theme.palette.background.default,
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    transition: 'transform 225ms ease-in-out 0ms',
    padding: '10px',
    pointerEvents: 'all',
    overflow: 'auto',
  },
  drawerSmall: {
    transform: 'translate(-300px)',
    width: '300px'
  },
  drawerBig: {
    transform: 'translate(-500px)',
    width: '500px'
  },
  drawerOpen: {
    transform: 'translate3d(0px, 0px, 0px)'
  },
  overlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'visibility 0s, opacity 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    pointerEvents: 'all'
  },
  overlayOpen: {
    opacity: 100,
    visibility: 'visible'
  }
}))

export default withStyles(styleSheet)(Drawer);
