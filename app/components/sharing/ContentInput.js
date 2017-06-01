// @flow
import React, { Component } from 'react'
import styles from './ContentInput.css'
import { FormControl, FormLabel } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import fs from 'fs'
import nodePath from 'path'
import * as humanize from 'utils/humanize'

const dialog = require('electron').remote.dialog

class ContentInput extends Component {

  _getProperties(path: string) {
    const stat = fs.statSync(path)
    return {
      path,
      size: stat.size,
      directory: stat.isDirectory()
    }
  }

  handleOpen() {
    const { input: { value, onChange} } = this.props
    const opened = dialog.showOpenDialog({
      properties: ['multiSelections'],
    })

    if(!opened) {
      return
    }

    // deduplicate, get properties and store
    const result = [...value]

    opened.forEach(path => {
      if(!result.some(entry => entry.path === path)) {
        result.push(this._getProperties(path))
      }
    })

    onChange(result)
  }

  handleRemove(index) {
    const { input: { value, onChange} } = this.props
    onChange(value.filter((_, i) => i !== index))
  }

  renderObject(index, {path, size, directory}) {
    return (
      <div key={path} className={styles.object}>
        <FontAwesome className={styles.icon} name={ directory ? "folder" : 'file-o' }/>
        <Typography noWrap className={styles.name}>{ nodePath.basename(path) }</Typography>
        <Typography className={styles.size}>{ humanize.filesize(size) }</Typography>
        <FontAwesome className={styles.remove} name='times' onClick={() => {::this.handleRemove(index)}}/>
      </div>
    )
  }

  render() {
    const { label, input: { value }, meta: { touched, error } } = this.props
    return (
      <FormControl error={touched && (error != null)} style={{ marginTop: '10px' }} >
        <FormLabel>{label}</FormLabel>
        {/* tabIndex is a trick to make the input focusable */}
        <div className={styles.wrapper}>
          { value && value.map((entry, index) => this.renderObject(index, entry)) }
          <div className={styles.adder} tabIndex={0} onClick={::this.handleOpen}>
            Add content
          </div>
        </div>
      </FormControl>
    )
  }
}

export default ContentInput
