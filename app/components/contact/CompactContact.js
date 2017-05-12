// @flow
import React, { Component } from 'react'
import Contact from 'models/Contact'
import styles from './CompactContact.css'
import classNames from 'classnames/bind'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'components/Avatar'

const cx = classNames.bind(styles);

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
    const { contact, selected } = this.props

    const cardClass = cx({
      card: true,
      cardSelected: selected
    })

    return (
      <Card className={cardClass} onClick={ ::this.props.onClick }>
        <CardHeader
          avatar={<Avatar person={contact} />}
          title={ contact.identity }
        />
      </Card>
    )
  }
}

export default CompactContact
