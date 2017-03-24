// @flow
import React, {Component, PropTypes} from 'react';
// import styles from './ShareFiles.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
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

  // Used to generate react keys
  // We can't use the ipfs hash because the same content can be in
  // different part of the tree
  id: number

  renderObject(obj: IpfsObject) {
    switch(obj.type) {
      case ObjectType.DIRECTORY:
        this.renderDirectory(obj)
        break
      case ObjectType.FILE:
        this.renderFile(obj)
        break
      default:
        console.assert(false)
    }
  }

  renderFile(file: IpfsFile) {
    this.buffer.push(
      <TableRow key={ this.id }>
        <TableCell>{ file.name }</TableCell>
        <TableCell numeric>{ file.sizeTotal }</TableCell>
        <TableCell numeric>{ file.sizeLocal / file.sizeTotal * 100 }%</TableCell>
      </TableRow>
    )
    this.id++
  }

  renderDirectory(dir: IpfsDirectory) {
    this.buffer.push(
      <TableRow key={ this.id }>
        <TableCell>{ dir.name }</TableCell>
        <TableCell numeric> </TableCell>
        <TableCell numeric> </TableCell>
      </TableRow>
    )
    this.id++

    dir.children.forEach(
      (child) => this.renderObject(child)
    )
  }

  render() {
    const content = this.props.share.content

    this.buffer = []
    this.id = 1

    content.forEach((obj) => this.renderObject(obj))

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
