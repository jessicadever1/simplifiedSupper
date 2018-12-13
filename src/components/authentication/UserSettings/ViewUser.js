import React, {Component} from 'react'
import {Button, Segment, Image, Divider, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


//TODO: Swap password view out with a protected version
//TODO: Icon for profile settings
export default class ViewUser extends Component{

  render(){
    return(
      <React.Fragment>
        <Segment.Group horizontal>
          <Segment>
            <Image size="small" src="https://react.semantic-ui.com/images/wireframe/image.png" floated="left" rounded/>
          </Segment>
          <Segment textAlign="left">
            <List>
              <List.Item>{this.props.activeUser.firstName} {this.props.activeUser.lastName}</List.Item>
              <List.Item icon="users" content={this.props.activeUser.username}/>
              <List.Item icon="mail" content={this.props.activeUser.email} />
              <List.Item icon="key" content={this.props.activeUser.password} />
            </List>
          </Segment>
        </Segment.Group>
        <Divider hidden/>
        <Button
          color="teal"
          as={Link}
          to="/"
          content="Go Home"
        />
        <Button
          color="teal"
          onClick={this.props.handleItemClick}
          name="Edit Profile"
          content="Edit Profile"
        />
      </React.Fragment>
    )
  }
}