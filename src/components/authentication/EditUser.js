/*
Given the user has an account with Simplified Supper
When the user is logged in to their account
Then they should have an option to view their profile information

When the user selects the option to view their profile information
Then they should be taken to a screen that displays their name, username, email, picture, and password
And be provided the opportunity to edit their information

When the user selects the affordance to edit their profile information
Then the information should populate into a form
And allow the user to update the information

When the user submits updated information
Then the database should be checked for any conflicts for username or email address
If there is a conflict
Then the user should see an error message that prompts them to update the information
If there is not a conflict the form should close and the database should be updated
*/
import React, {Component} from 'react'
import {Button, Placeholder, Grid, Header, Form} from 'semantic-ui-react'
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
    cnPassword: ""
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
      if(email !== ""){
        APIManager.getAllCategory("users").then(users => {
          users.forEach(user =>{
            if(user.email === email){
              console.log("Another user already has that email")
              // stateToChange["email"] = ""
              // this.setState(stateToChange)
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
      if(username !== ""){
        APIManager.getAllCategory("users").then(users => {
          users.forEach(user => {
            if(user.username === username){
              console.log("that username is already in use")
              // stateToChange["username"] = ""
              // this.setState(stateToChange)
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
    } else if(evt.target.id === "cnPassword"){
      let password=evt.target.value
      if(password !== "" && this.state.oldPassword !== "" && this.state.nPassword !== ""){
        if(this.state.oldPassword === this.props.activeUser.password){
          if(this.state.nPassword === password){
            stateToChange["cnPassword"] = password
            this.setState(stateToChange)
          }else{
            console.log("your passwords do not match")
            stateToChange["cnPassword"] = password
            this.setState(stateToChange)
          }
        } else{
          console.log("Your old password does not match what we have on file")
        }
      } else{
        console.log("you must fill out all fields")
      }
    } else{
      stateToChange[evt.target.id] = evt.target.value
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
              <Header as="h2" color="teal" textAlign="center">
                Simplified Supper
              </Header>
              <Placeholder style={{height:150, width: 150}}>
                <Placeholder.Image />
              </Placeholder>
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Group widths="equal">
                  <Form.Input fluid label="First Name" id="firstName" value={firstName} onChange={this.handleFieldChange}/>
                  <Form.Input fluid label="Last Name" id="lastName" value={lastName} onChange={this.handleFieldChange}/>
                </Form.Group>
                <Form.Input label="Username" id="username" value={username} onChange={this.handleFieldChange} />
                <Form.Input label="Email" id="email" value={email} onChange={this.handleFieldChange}/>
                <Form.Input label="Old Password" id="oldPassword" value={oldPassword} onChange={this.handleFieldChange}/>
                <Form.Input label="New Password" id="nPassword" value={nPassword} onChange={this.handleFieldChange}/>
                <Form.Input label="Confirm New Password" id="cnPassword" value={cnPassword} onChange={this.handleFieldChange}/>
                <Form.Button as={Link} to="/ViewProfile">Save Changes</Form.Button>
              </Form>
            </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}