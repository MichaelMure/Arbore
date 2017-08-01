// @flow
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import { emphasize } from 'material-ui/styles/colorManipulator'

class RecipientsInputAutocomplete extends Component {
  state = {
    value: '',
    suggestions: [],
  }

  props: {
    contactList: ContactList,
    onRecipientSelect: (contact: Contact) => any,
    inputRef: any
  }

  handleSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.props.contactList.autoComplete(value),
    })
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    })
  }

  handleSuggestionSelected(event, { suggestion }) {
    this.props.onRecipientSelect(suggestion)

    this.setState({
      value: '',
      suggestions: []
    })
  }

  handleChange(event, { newValue }) {
    this.setState({
      value: newValue,
    })
  }

  render() {
    const { classes, inputRef } = this.props

    return (
      <Autosuggest
        ref={inputRef ? inputRef : () => {} }
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={::this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={::this.handleSuggestionsClearRequested}
        onSuggestionSelected={::this.handleSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion
        inputProps={{
          autoFocus: true,
          placeholder: 'Search a contact...',
          value: this.state.value,
          onChange: ::this.handleChange,
        }}
      />
    )
  }
}

function renderInput(inputProps) {
  const { home, value, ref, ...other } = inputProps

  return (
    <Input
      autoFocus={home}
      value={value}
      inputRef={ref}
      inputProps={{...other}}
      disableUnderline
    />
  )
}

function renderSuggestion(suggestion: Contact, { query, isHighlighted }) {
  const matches = match(suggestion.identity, query)
  const parts = parse(suggestion.identity, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight
            ? <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            : <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
        })}
      </div>
    </MenuItem>
  )
}

function getSuggestionValue(suggestion: Contact) {
  return suggestion.identity
}

const styleSheet = createStyleSheet('IntegrationAutosuggest', theme => {
  const backgroundColor = emphasize(theme.palette.background.default, 0.12)

  return {
    container: {
      flexGrow: 1,
      position: 'relative',
      height: 200,
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      left: 0,
      right: 0,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      zIndex: 1,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
  }
})

export default withStyles(styleSheet)(RecipientsInputAutocomplete)
