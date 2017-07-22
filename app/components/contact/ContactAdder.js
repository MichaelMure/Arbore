// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import AddByPubkey from 'containers/contact/AddByPubkey'
import AddBySuggest from 'containers/contact/AddBySuggest'

const Steps = {
  START: 'START',
  CHOICE: 'CHOICE',
  ADDER: 'ADDER',
}

const Adder = {
  ID: 'ID',
  SUGGEST: 'SUGGEST',
}
type AdderType = $Keys<typeof Adder>

class ContactAdder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      step: Steps.START,
      adder: null
    }
  }

  showChoices() {
    this.setState({
      step: Steps.CHOICE,
    })
  }

  reset() {
    this.setState({
      step: Steps.START,
      adder: null
    })
  }

  handleChoice(adder: AdderType) {
    return () => {
      this.setState({
        step: Steps.ADDER,
        adder: adder
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <Collapse in={this.state.step === Steps.START} >
          <Fade in={this.state.step === Steps.START} >
            <div className={classes.ghost} onClick={::this.showChoices}>
              <Typography>Add a new contact</Typography>
            </div>
          </Fade>
        </Collapse>
        <Collapse in={this.state.step === Steps.CHOICE} >
          <Fade in={this.state.step === Steps.CHOICE} >
            <div className={classes.choices}>
              <div onClick={::this.handleChoice(Adder.ID)}>ID</div>
              <div onClick={::this.handleChoice(Adder.SUGGEST)}>Suggest</div>
            </div>
          </Fade>
        </Collapse>
        <Collapse in={this.state.step === Steps.ADDER} >
          <Fade in={this.state.step === Steps.ADDER} >
            <div>
              { this.state.adder === Adder.ID && <AddByPubkey onCancelClick={::this.reset} />}
              { this.state.adder === Adder.SUGGEST && <AddBySuggest onCancelClick={::this.reset} />}
            </div>
          </Fade>
        </Collapse>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('ContactAdder', theme => ({
  wrapper: {
    border: '2px dashed gray',
    minHeight: 56,
  },
  ghost: {
    padding: 16.5,
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'Roboto',
  },
  choices: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      flex: 1,
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 52,
      lineHeight: '52px',
      cursor: 'pointer',
      userSelect: 'none',
      fontFamily: 'Roboto',
      color: theme.palette.text.primary,
    },
    '& > *:hover': {
      backgroundColor: 'lightgray',
    },
  }
}))

export default withStyles(styleSheet)(ContactAdder)
