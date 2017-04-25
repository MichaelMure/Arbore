// @flow
import React, { Component } from 'react'
import Contact from 'models/Contact'
// import styles from './Contact.css'
import { Card, CardContent, CardHeader } from 'material-ui/Card'
import { Avatar, Text } from 'material-ui'
import Collapse from 'material-ui/transitions/Collapse'

class ContactDetail extends Component {

  props: {
    contact: Contact
  }

  state: {
    expanded: boolean
  }


  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const contact = this.props.contact

    return (
      <Card>
        <CardHeader
          avatar={<Avatar
            alt={ contact.identity }
            src={ contact.avatarData }
          />}
          title={ contact.identity }
          onClick={ ::this.toggleExpanded }
        />
        <Collapse in={this.state.expanded} transitionDuration="auto">
          <CardContent>
            <Text component="p">{ contact.bio}</Text>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default ContactDetail
