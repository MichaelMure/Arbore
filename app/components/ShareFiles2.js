// @flow
import React, {Component, PropTypes} from 'react';
// import styles from './ShareFiles.css';
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

  renderLevel(level: number) {
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
      <tr key={path}>
        <td>{ this.renderLevel(level) }{ file.name }</td>
        <td>{ file.sizeTotal }</td>
        <td>{ file.sizeLocal / file.sizeTotal * 100 }%</td>
      </tr>
    )
  }

  renderDirectory(dir: IpfsDirectory, path: string, level: number) {
    path = path + '/' + dir.name
    this.buffer.push(
      <tr key={path}>
        <td>{ this.renderLevel(level) }{ dir.name }</td>
        <td> </td>
        <td> </td>
      </tr>
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          { this.buffer }
        </tbody>
      </table>
    );
  }
}

ShareFiles.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired
};
ShareFiles.defaultProps = {};

export default ShareFiles;
