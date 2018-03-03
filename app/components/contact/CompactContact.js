// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { darken } from 'material-ui/styles/colorManipulator'
import Card, { CardHeader } from 'material-ui/Card'
import Contact from 'models/Contact'
import classNames from 'classnames'
import Avatar from 'components/common/Avatar'

class CompactContact extends Component {

  props: {
    contact: Contact,
    selected: boolean,
    onClick: () => void,
  }

  static defaultProps = {
    selected: false
  }

  render() {
    const { classes, contact, selected } = this.props

    const cardClass = classNames(classes.card, {
      [classes.cardSelected]: selected,
    })

    return (
      <Card className={cardClass} onClick={ ::this.props.onClick }>
        <CardHeader
          className={classes.header}
          avatar={<Avatar person={contact} />}
          title={ contact.identity }
        />
      </Card>
    )
  }
}

const style = theme => ({
  card: {
    marginTop: 10,
    backgroundColor: theme.palette.background.light,
  },
  cardSelected: {
    backgroundColor: theme.palette.background.darker,
  },
  header: {
    paddingBottom: '10px !important',
    paddingTop: '10px !important'
  }
})

export default withStyles(style)(CompactContact)
