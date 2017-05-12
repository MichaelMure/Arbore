// @flow
import React, { Component } from 'react'
import styles from './ContactAdder.css'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import AddByPubkey from 'components/contact/AddByPubkey'

class ContactAdder extends Component {

  props: {}

  state = {
    editing: false
  }

  showForm() {
    this.setState({
      editing: true
    })
  }

  reset() {
    this.setState({
      editing: false
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Collapse in={!this.state.editing} >
          <Fade in={!this.state.editing} >
            <div
              className={styles.ghost}
              onClick={::this.showForm}
            >
              Add a new contact
            </div>
          </Fade>
        </Collapse>
        <Collapse in={this.state.editing} >
          <Fade in={this.state.editing} >
            <AddByPubkey
              waiting={false}
              onCancelClick={::this.reset}
            />
          </Fade>
        </Collapse>
      </div>
    )
  }
}

export default ContactAdder
