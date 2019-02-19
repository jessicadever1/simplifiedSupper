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
        <Form onSubmit={()=>this.props.handle_form_submit("Edit Profile")}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              id="first_name"
              value={this.props.state.first_name}
              onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
              focus={this.props.state.first_nameFocus}
            />
            <Form.Input
              fluid
              label="Last Name"
              id="last_name"
              value={this.props.state.last_name}
              onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
              focus={this.props.state.last_nameFocus}
              />
          </Form.Group>
          <Form.Input
            label="Username"
            id="username"
            value={this.props.state.username}
            onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
            error={this.props.state.username_error}
            focus={this.props.state.username_focus}
          />
          <Form.Input
            label="Email"
            id="email"
            value={this.props.state.email}
            onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
            error={this.props.state.email_error}
            focus={this.props.state.email_focus}
          />
          <Form.Input
            label="Current Password"
            id="previousPassword"
            value={this.props.state.previous_password}
            onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
            error={this.props.state.previous_password_error}
            focus={this.props.state.previous_password_focus}
          />
          <Form.Input
            label="New Password"
            id="password"
            value={this.props.state.password}
            onChange={(evt)=>this.props.handle_field_change(evt, "Edit Profile")}
          />
          <Form.Input
            label="Confirm New Password"
            id="confirmPassword"
            value={this.props.state.confirm_password}
            onChange={(evt)=>this.handle_field_change(evt, "Edit Profile")}
            error={this.props.state.confirm_password_error}
            focus={this.props.state.confirm_password_focus}
          />
          <Form.Button type="submit" color="teal" content="Save Changes"/>
          <Button
            name = "View Profile"
            onClick={this.props.handle_item_click}
            color="teal"
            content="Cancel Changes"
          />
        </Form>
      </React.Fragment>
    )
  }
}