// @flow
import React, { Component } from 'react'
import styles from './CompactContact.css'
import Card, { CardHeader } from 'material-ui/Card'
import Contact from 'models/Contact'
import classNames from 'classnames/bind'
import Avatar from 'components/common/Avatar'

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
          className={styles.header}
          avatar={<Avatar person={contact} />}
          title={ contact.identity }
        />
      </Card>
    )
  }
}

export default CompactContact
