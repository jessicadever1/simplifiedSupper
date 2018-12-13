/*
When the user submits updated information
Then the database should be checked for any conflicts for username or email address
If there is a conflict
Then the user should see an error message that prompts them to update the information
If there is not a conflict the form should close and the database should be updated
*/
import React, {Component} from 'react'
import {Placeholder, Grid, Header, Form, Segment, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import APIManager from '../../modules/APIManager';

//TODO: Consider creating a user management platform that holds all field change and submit functions to remove repetitive code
//TODO: Set up validation that happens and displays errors in real time, if any of the conditions are not met, the user is not able to press the save button
//FIXME: Async issues with saving updated user in the database and updating state quickly enough.
export default class EditUser extends Component{
  state={
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    oldPassword: "",
    nPassword: "",
    cnPassword: "",
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    newPasswordError: false,
    firstNameFocus: false,
    lastNameFocus: false,
    usernameFocus: false,
    emailFocus: false,
    passwordFocus: false,
    newPasswordFocus: false,
  }

  componentDidMount=()=>{
    let stateToChange = {}
    stateToChange={
      firstName: this.props.activeUser.firstName,
      lastName: this.props.activeUser.lastName,
      username: this.props.activeUser.username,
      email: this.props.activeUser.email
    }
    this.setState(stateToChange)
  }

  handleFieldChange=(evt)=>{
    const stateToChange={}
    if(evt.target.id === 'email'){
      let email = evt.target.value
      this.setState({emailFocus: true, emailError: false})
      if(email !== ""){
        if(!email.includes("@")){
          stateToChange["emailError"]= true
          this.setState(stateToChange)
        }
        APIManager.getAllCategory("users").then(users => {
          users.forEach(user =>{
            if(user.email === email){
              stateToChange["emailError"] = true
              this.setState(stateToChange)
            } else{
              stateToChange["email"] = email
              this.setState(stateToChange)
            }
          })
        })
      } else{
        stateToChange["email"] = this.props.activeUser.email
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "username"){
      let username = evt.target.value
      this.setState({usernameError: false, usernameFocus: true})
      if(username !== ""){
        APIManager.getAllCategory("users").then(users => {
          users.forEach(user => {
            if(user.username === username){
              stateToChange["usernameError"] = true
              this.setState(stateToChange)
            } else{
              stateToChange["username"]= username
              this.setState(stateToChange)
            }
          })
        })
      } else{
        stateToChange["username"] = this.props.activeUser.username
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "oldPassword"){
      let oldPassword = evt.target.value
      this.setState({passwordError: false, passwordFocus: true})
      if(oldPassword !== this.props.activeUser.password){
        stateToChange["passwordError"] = true
        stateToChange["oldPassword"] = oldPassword
        this.setState(stateToChange)
      } else{
        stateToChange["oldPassword"] = oldPassword
      }
    } else if(evt.target.id === "nPassword"){
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }
    else if(evt.target.id === "cnPassword"){
      let cnPassword = evt.target.value
      this.setState({newPasswordError: false, newPasswordFocus: true})
      if(this.state.nPassword === cnPassword){
        stateToChange["cnPassword"] = cnPassword
        this.setState(stateToChange)
      } else{
        stateToChange["newPasswordError"] = true
        stateToChange["cnPassword"] = cnPassword
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "firstName"){
      stateToChange[evt.target.id] = evt.target.value
      stateToChange["firstNameFocus"] = true
      this.setState(stateToChange)
    } else if(evt.target.id === "lastName"){
      stateToChange[evt.target.id] = evt.target.value
      stateToChange["lastNameFocus"] = true
      this.setState(stateToChange)
    }
  }

  handleFormSubmit=()=>{
    let stateToChange = {}
    if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.username !== "" && this.state.email !== ""){
      if(this.state.cnPassword !== ""){
        if(this.state.cnPassword === this.state.nPassword){
          let updatedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.cnPassword
          }
          APIManager.updateItem("users", this.props.activeUser.id, updatedUser)
        } else{
          console.log("Your passwords must match to save changes")
        }
      } else{
        let updatedUser={
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          email: this.state.email,
          password: this.props.activeUser.password
        }
        this.props.updateUserInfo(updatedUser, this.props.activeUser.id)
      }
    } else{
      console.log("please fill out all fields")
    }
  }
  render(){
    const {firstName, lastName, username, email, oldPassword, nPassword, cnPassword} = this.state
    return(
      <React.Fragment>
        <div className="edit-user">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.edit-user{
              height: 100%
            }`}</style>
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
            <Grid.Column style={{maxWidth: 450}}>
              <Segment raised>
                <Header
                  as="h2"
                  color="teal"
                  textAlign="center"
                  content="Simplified Supper"
                  attached="top"/>
                <Segment attached size="huge">
                  <Placeholder style={{height:150, width: 150}}>
                    <Placeholder.Image />
                  </Placeholder>
                  <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        label="First Name"
                        id="firstName"
                        value={firstName}
                        onChange={this.handleFieldChange}
                        error={this.state.firstNameError}
                        focus={this.state.firstNameFocus}
                      />
                      <Form.Input
                        fluid
                        label="Last Name"
                        id="lastName"
                        value={lastName}
                        onChange={this.handleFieldChange}
                        error={this.state.lastNameError}
                        focus={this.state.lastNameFocus}
                        />
                    </Form.Group>
                    <Form.Input
                      label="Username"
                      id="username"
                      value={username}
                      onChange={this.handleFieldChange}
                      error={this.state.usernameError}
                      focus={this.state.usernameFocus}
                    />
                    <Form.Input
                      label="Email"
                      id="email"
                      value={email}
                      onChange={this.handleFieldChange}
                      error={this.state.emailError}
                      focus={this.state.emailFocus}
                    />
                    <Form.Input
                      label="Old Password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={this.handleFieldChange}
                      error={this.state.passwordError}
                      focus={this.state.passwordFocus}
                    />
                    <Form.Input
                      label="New Password"
                      id="nPassword"
                      value={nPassword}
                      onChange={this.handleFieldChange}
                    />
                    <Form.Input
                      label="Confirm New Password"
                      id="cnPassword"
                      value={cnPassword}
                      onChange={this.handleFieldChange}
                      error={this.state.newPasswordError}
                      focus={this.state.newPasswordFocus}
                    />
                    <Button
                      as={Link}
                      to="/ViewProfile"
                      color="teal"
                      content="Save Changes"
                    />
                  </Form>
                </Segment>
              </Segment>
            </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}