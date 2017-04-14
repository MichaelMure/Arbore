// @flow
import React, { Component } from 'react';
// import styles from './ShareFiles.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table';
import Share from "../models/Share";
import { ObjectType } from '../models/IpfsObject'
import type { IpfsObject } from '../models/IpfsObject'
import IpfsFile from '../models/IpfsFile'
import IpfsDirectory from '../models/IpfsDirectory'

class ShareFiles extends Component {

  props: {
    share: Share
  }

  // This is not the more elegant code ever
  // but apparently this is the way to concatenate
  // jsx elements
  buffer: Array

  indent: number

  static renderLevel(level: number) {
    return (level > 0 ? '|' : '') + '--'.repeat(level) + (level > 0 ? '>' : '');
  }

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
    this.buffer.push(
      <TableRow key={path}>
        <TableCell>{ ShareFiles.renderLevel(level) }{ name }</TableCell>
        <TableCell>{ file.sizeTotal }</TableCell>
        <TableCell>{ file.sizeLocal / file.sizeTotal * 100 }%</TableCell>
      </TableRow>
    )
  }

  renderDirectory(dir: IpfsDirectory, name: string, path: string, level: number) {
    this.buffer.push(
      <TableRow key={path}>
        <TableCell>{ ShareFiles.renderLevel(level) }{ name }</TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
      </TableRow>
    )

    dir.children.entrySeq().forEach(
      ([name, object]) => this.renderObject(object, name, path + '/' + name, level + 1)
    )
  }

  render() {
    if(! this.props.share.metadataLocal) {
      return (<div>Waiting for metadata...</div>)
    }

    const content = this.props.share.content
    this.buffer = []
    this.indent = 0

    content.entrySeq().forEach(([name, object]) =>
      this.renderObject(object, name, name, 0)
    )

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.buffer }
        </TableBody>
      </Table>
    );
  }
}

export default ShareFiles;
