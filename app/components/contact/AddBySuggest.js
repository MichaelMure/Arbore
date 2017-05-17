// @flow
import React, { Component } from 'react'
import styles from './AddBySuggest.css'
import Button from 'material-ui/Button'

class AddBySuggest extends Component {

  props: {
    onCancelClick: () => any
  }

  render() {
    return (
      <div className={styles.wrapper}>
        Suggest
        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default AddBySuggest
