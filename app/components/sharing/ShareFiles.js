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

  renderObject(obj: IpfsObject, withProgress: boolean, name: string, path: string, level: number) {
    switch(obj.type) {
      case ObjectType.DIRECTORY:
        return this.renderDirectory(obj, withProgress, name, path, level)
      case ObjectType.FILE:
        return this.renderFile(obj, withProgress, name, path, level)
      default:
        console.assert(false)
    }
  }

  renderFile(file: IpfsFile, withProgress: boolean, name: string, path: string, level: number) {
    const { classes } = this.props

    return (
      <div key={path} className={classes.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <Typography className={classes.name}>
          <span className={classes.icon}><FontAwesome name="file-o"/></span>
          { name }
        </Typography>
        { withProgress && (
          <div className={classes.progress}>
            <div style={{width: `${100 * file.progress}%`, backgroundColor: 'green'}} >
              <Typography>{Math.round(100 * file.progress)}%</Typography>
            </div>
          </div>
        )}
        <Typography className={classes.size}>{humanize.filesize(file.sizeTotal)}</Typography>
      </div>
    )
  }

  renderDirectory(dir: IpfsDirectory, withProgress: boolean, name: string, path: string, level: number) {
    const { classes } = this.props

    const result = [(
      <div key={path} className={classes.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <Typography className={classes.name}>
          <span className={classes.expander}><FontAwesome name="folder-open-o"/></span>
          { name }
        </Typography>
      </div>
    )]

    return result.concat(
      dir.children.entrySeq().map(
        ([name, object]) => this.renderObject(object, withProgress, name, path + '/' + name, level + 1)
      )
    )
  }

  render() {
    const { classes, share } = this.props

    if(! this.props.share.metadataLocal) {
      const progress = share.metadataProgress
      return (<div><Typography>Waiting for metadata ({progress[0]} of {progress[1]})</Typography></div>)
    }

    const content = share.content.children
    const withProgress = ! share.isAuthor

    return (
      <div className={classes.wrapper}>
        { content.entrySeq().map(([name, object]) => this.renderObject(object, withProgress, name, name, 0)) }
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
