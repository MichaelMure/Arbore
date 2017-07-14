// @flow
import React, { Component } from 'react'
import styles from './ShareFiles.css'
import Share from 'models/Share'
import { ObjectType } from 'models/IpfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import IpfsFile from 'models/IpfsFile'
import IpfsDirectory from 'models/IpfsDirectory'
import FontAwesome from 'react-fontawesome'
import * as humanize from 'utils/humanize'

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
    // const progress: number = file.sizeLocal / file.sizeTotal * 100
    const progress = Math.round(Math.random() * 100)
    this.buffer.push(
      <div key={path} className={styles.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <span className={styles.icon}><FontAwesome name="file-o"/></span>
        <span className={styles.name}>{ name }</span>
        <div className={styles.progress}>
          <div style={{width: `${progress}%`, backgroundColor: 'green'}} >{progress}%</div>
        </div>
        <span className={styles.size}>{humanize.filesize(file.sizeTotal)}</span>
      </div>
    )
  }

  renderDirectory(dir: IpfsDirectory, name: string, path: string, level: number) {
    this.buffer.push(
      <div key={path} className={styles.object}>
        <span style={{width: `${20*level}px`, display: 'inline-block'}} />
        <span className={styles.expander}><FontAwesome name="folder-open-o"/></span>
        <span className={styles.name}>{ name }</span>
      </div>
    )

    dir.children.entrySeq().forEach(
      ([name, object]) => this.renderObject(object, name, path + '/' + name, level + 1)
    )
  }

  render() {
    if(! this.props.share.metadataLocal) {
      return (<div>Waiting for metadata...</div>)
    }

    const content = this.props.share.content.children
    this.buffer = []

    content.entrySeq().forEach(([name, object]) =>
      this.renderObject(object, name, name, 0)
    )

    return (
      <div className={styles.wrapper}>
        { this.buffer }
      </div>
    );
  }
}

export default ShareFiles;
