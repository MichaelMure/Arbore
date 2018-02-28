// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Share from 'models/Share'
import { ObjectType } from 'models/IpfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import IpfsFile from 'models/IpfsFile'
import IpfsDirectory from 'models/IpfsDirectory'
import FontAwesome from 'react-fontawesome'
import * as humanize from 'utils/humanize'
import Typography from 'material-ui/Typography'

class ShareFiles extends Component {

  props: {
    share: Share
  }

  // This is not the more elegant code ever
  // but apparently this is the way to concatenate
  // jsx elements
  buffer: Array

  renderObject(obj: IpfsObject, name: string, path: string, level: number) {
    switch(obj.type) {
      case ObjectType.DIRECTORY:
        this.renderDirectory(obj, name, path, level)
        break
      case ObjectType.FILE:
        this.renderFile(obj, name, path, level)
        break
      default:
        console.assert(false)
    }
  }

  renderFile(file: IpfsFile, name: string, path: string, level: number) {
    const { classes } = this.props

    this.buffer.push(
      <div key={path} className={classes.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <Typography className={classes.name}>
          <span className={classes.icon}><FontAwesome name="file-o"/></span>
          { name }
        </Typography>
        <div className={classes.progress}>
          <div style={{width: `${100 * file.progress}%`, backgroundColor: 'green'}} >
            <Typography>{Math.round(100 * file.progress)}%</Typography>
          </div>
        </div>
        <Typography className={classes.size}>{humanize.filesize(file.sizeTotal)}</Typography>
      </div>
    )
  }

  renderDirectory(dir: IpfsDirectory, name: string, path: string, level: number) {
    const { classes } = this.props
    this.buffer.push(
      <div key={path} className={classes.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <Typography className={classes.name}>
          <span className={classes.expander}><FontAwesome name="folder-open-o"/></span>
          { name }
        </Typography>
      </div>
    )

    dir.children.entrySeq().forEach(
      ([name, object]) => this.renderObject(object, name, path + '/' + name, level + 1)
    )
  }

  render() {
    const { classes, share } = this.props

    if(! this.props.share.metadataLocal) {
      const progress = share.metadataProgress
      return (<div><Typography>Waiting for metadata ({progress[0]} of {progress[1]})</Typography></div>)
    }

    const content = share.content.children
    this.buffer = []

    content.entrySeq().forEach(([name, object]) =>
      this.renderObject(object, name, name, 0)
    )

    return (
      <div className={classes.wrapper}>
        { this.buffer }
      </div>
    );
  }
}

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.dark,
    borderRadius: 5,
    padding: 2,
  },
  object: {
    display: 'flex',
    flexDirection: 'row',
  },
  expander: {
    width: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
  },
  icon: {
    width: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  name: {
    flexGrow: 1,
    flexShrink: 1000,
  },
  progress: {
    height: 20,
    width: 60,
    border: '1px solid gray',
  },
  size: {
    width: 100,
    textAlign: 'right',
  },
})

export default withStyles(style)(ShareFiles)
