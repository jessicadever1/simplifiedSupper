/*
When the user submits updated information
Then the database should be checked for any conflicts for username or email address
If there is a conflict
Then the user should see an error message that prompts them to update the information
If there is not a conflict the form should close and the database should be updated
*/
import React, {Component} from 'react'
import {Placeholder, Form, Button} from 'semantic-ui-react'


//TODO: If user wants to update password, they must first confirm their old password to make that change
//FIXME: Async issues with saving updated user in the database and updating state quickly enough.
export default class EditUser extends Component{


  // componentDidMount=()=>{
  //   let stateToChange = {}
  //   stateToChange={
  //     firstName: this.props.activeUser.firstName,
  //     lastName: this.props.activeUser.lastName,
  //     username: this.props.activeUser.username,
  //     email: this.props.activeUser.email
  //   }
  //   this.setState(stateToChange)
  // }

  render(){
    return(
      <React.Fragment>
        <Placeholder style={{height:150, width: 150}}>
          <Placeholder.Image />
        </Placeholder>
        <Form onSubmit={()=>this.props.handleFormSubmit("Edit Profile")}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              id="firstName"
              value={this.props.state.firstName}
              onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
              focus={this.props.state.firstNameFocus}
            />
            <Form.Input
              fluid
              label="Last Name"
              id="lastName"
              value={this.props.state.lastName}
              onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
              focus={this.props.state.lastNameFocus}
              />
          </Form.Group>
          <Form.Input
            label="Username"
            id="username"
            value={this.props.state.username}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
            error={this.props.state.usernameError}
            focus={this.props.state.usernameFocus}
          />
          <Form.Input
            label="Email"
            id="email"
            value={this.props.state.email}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
            error={this.props.state.emailError}
            focus={this.props.state.emailFocus}
          />
          <Form.Input
            label="Current Password"
            id="previousPassword"
            value={this.props.state.previousPassword}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
            error={this.props.state.previousPasswordError}
            focus={this.props.state.previousPasswordFocus}
          />
          <Form.Input
            label="New Password"
            id="password"
            value={this.props.state.password}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Edit Profile")}
          />
          <Form.Input
            label="Confirm New Password"
            id="confirmPassword"
            value={this.props.state.confirmPassword}
            onChange={(evt)=>this.handleFieldChange(evt, "Edit Profile")}
            error={this.props.state.confirmPasswordError}
            focus={this.props.state.confirmPasswordFocus}
          />
          <Form.Button type="submit" color="teal" content="Save Changes"/>
          <Button
            name = "View Profile"
            onClick={this.props.handleItemClick}
            color="teal"
            content="Cancel Changes"
          />
        </Form>
      </React.Fragment>
    )
  }
}