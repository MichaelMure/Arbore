// @flow
import React, { Component } from 'react'
import styles from './ContentInput.css'
import { FormControl, FormLabel } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import fs from 'fs'
import nodePath from 'path'
import * as humanize from 'utils/humanize'
import getFolderSize from 'get-folder-size'
import queryablePromise from 'utils/queryablePromise'

const dialog = require('electron').remote.dialog

class ContentInput extends Component {

  _getProperties(path: string) {
    const stat = fs.statSync(path)

    const size = queryablePromise(
      stat.isDirectory()
        ? new Promise((resolve, reject) => { getFolderSize(path, (err, total) => err ? reject(err) : resolve(total)) })
        : Promise.resolve(stat.size)
    )

    return {
      path,
      size,
      directory: stat.isDirectory()
    }
  }

  // Helper for the keyboard navigation
  enterToClick(e) {
    console.log(e)
    if (e.key === 'Enter') {
      e.target.click()
    }
  }

  handleOpen(directories: boolean) {
    const { input: { value, onChange} } = this.props
    const opened = dialog.showOpenDialog({
      properties: ['multiSelections', directories ? 'openDirectory' : 'openFile'],
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
    let displaySize
    if(!size.isFulfilled()) {
      displaySize = null
      size.then(() => this.forceUpdate())
    } else {
      displaySize = size.result()
    }

    return (
      <div key={path} className={styles.object}>
        <FontAwesome className={styles.icon} name={ directory ? "folder" : 'file-o' }/>
        <Typography noWrap className={styles.name}>{ nodePath.basename(path) }</Typography>
        { displaySize !== null && <Typography className={styles.size}>{ humanize.filesize(displaySize) }</Typography> }
        <FontAwesome className={styles.remove} name='times' onClick={() => {::this.handleRemove(index)}}/>
      </div>
    )
  }

  render() {
    const { label, input: { value }, meta: { touched, error } } = this.props
    return (
      <FormControl error={touched && (error != null)} style={{ marginTop: '10px' }} >
        <FormLabel>{label}</FormLabel>

        <div className={styles.wrapper}>
          { value && value.map((entry, index) => this.renderObject(index, entry)) }
          <div className={styles.buttons}>
            <div className={styles.button} tabIndex={0}
                 onClick={() => { ::this.handleOpen(false) }}
                 onKeyPress={ ::this.enterToClick }
            >
              <FontAwesome className={styles.icon} name='file-o'/>
              Add files
            </div>
            <div className={styles.button} tabIndex={0}
                 onClick={() => { ::this.handleOpen(true) }}
                 onKeyPress={ ::this.enterToClick }
            >
              <FontAwesome className={styles.icon} name="folder"/>
              Add directories
            </div>
          </div>
        </div>
      </FormControl>
    )
  }
}

export default ContentInput
