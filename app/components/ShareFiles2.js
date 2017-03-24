// @flow
import React, {Component, PropTypes} from 'react';
// import styles from './ShareFiles.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table';
import Share from "../models/Share";
import IpfsObject, {ObjectType} from '../models/IpfsObject'
import IpfsFile from '../models/IpfsFile'
import IpfsDirectory from '../models/IpfsDirectory'

class ShareFiles extends Component {

  // This is not the more elegant code ever
  // but apparently this is the way to concatenate
  // jsx elements
  buffer: Array

  indent: number

  static renderLevel(level: number) {
    return (level > 0 ? '|' : '') + '--'.repeat(level) + (level > 0 ? '>' : '');
  }

  renderObject(obj: IpfsObject, path: string, level: number) {
    switch(obj.type) {
      case ObjectType.DIRECTORY:
        this.renderDirectory(obj, path, level)
        break
      case ObjectType.FILE:
        this.renderFile(obj, path, level)
        break
      default:
        console.assert(false)
    }
  }

  renderFile(file: IpfsFile, path: string, level: number) {
    path = path + '/' + file.name
    this.buffer.push(
      <TableRow key={path}>
        <TableCell>{ ShareFiles.renderLevel(level) }{ file.name }</TableCell>
        <TableCell>{ file.sizeTotal }</TableCell>
        <TableCell>{ file.sizeLocal / file.sizeTotal * 100 }%</TableCell>
      </TableRow>
    )
  }

  renderDirectory(dir: IpfsDirectory, path: string, level: number) {
    path = path + '/' + dir.name
    this.buffer.push(
      <TableRow key={path}>
        <TableCell>{ ShareFiles.renderLevel(level) }{ dir.name }</TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
      </TableRow>
    )

    dir.children.forEach(
      (child) => this.renderObject(child, path, level + 1)
    )
  }

  render() {
    const content = this.props.share.content

    this.buffer = []
    this.indent = 0

    content.forEach((obj) => this.renderObject(obj, '', 0))

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

ShareFiles.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired
};
ShareFiles.defaultProps = {};

export default ShareFiles;
