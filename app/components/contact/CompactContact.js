// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
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

    const title = <Typography variant='body2' noWrap>
      {contact.identity}
    </Typography>

    return (
      <Card className={cardClass} onClick={ ::this.props.onClick }>
        <CardHeader
          className={classes.header}
          avatar={<Avatar person={contact} />}
          title={title}
          classes={{ content: classes.content }}
        />
      </Card>
    )
  }
}

const style = theme => ({
  card: {
    marginTop: 10,
    backgroundColor: theme.palette.background.dark,
  },
  cardSelected: {
    backgroundColor: theme.palette.background.light,
  },
  header: {
    paddingBottom: '10px !important',
    paddingTop: '10px !important'
  },
  content: {
    minWidth: 0,
    overflow: 'hidden',
  }
})

export default withStyles(style)(CompactContact)
