import React, {Component} from 'react'
import {Header, Grid} from 'semantic-ui-react'
import LogInRegister from './UserAccess/LogInRegister'
import APIManager from '../../modules/APIManager'
import UserSettings from './UserSettings/UserSettings';

//TODO: Add Simplified Supper logo to header
//TODO: Capture security question id before post
//TODO: Password should be at least 7 characters
//TODO: Need to make sure that the submit button becomes active from anywhere as soon as the form is filled out and does not contain errors.
//TODO: Update field validation to be in realtime, and error messages to display inline, not as console logs
//TODO: Set up validation that happens and displays errors in real time, if any of the conditions are not met, the user is not able to press the save button
//TODO: Update focus functionality using refs instead of individual states

export default class UserManagement extends Component{
  state={
    firstName: "",
    lastName: "",
    gender: "",
    username: "",
    email: "",
    previousPassword: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityQuestionAnswer: "",
    terms: false,
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    previousPasswordError: false,
    firstNameFocus: false,
    lastNameFocus: false,
    usernameFocus: false,
    emailFocus: false,
    previousPasswordFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false,
    securityQuestionAnswerFocus: false,
    disabled: false
  }

  handleFieldChange=(evt, key)=>{
    let stateToChange ={}
    // this.setState({disabled: true})
    if(evt.target.id === "firstName"){
      stateToChange[evt.target.id] = evt.target.value
      stateToChange["firstNameFocus"] = true
      this.setState(stateToChange)
    } else if(evt.target.id === "lastName"){
      stateToChange[evt.target.id] = evt.target.value
      stateToChange["lastNameFocus"] = true
      this.setState(stateToChange)
    } else if(evt.target.id === "password"){
      stateToChange[evt.target.id] = evt.target.value
      stateToChange["passwordFocus"] = true
      this.setState(stateToChange)
    } else if(evt.target.id === "previousPassword"){
      let previousPassword = evt.target.value
      stateToChange["previousPasswordFocus"] = true
      stateToChange["previousPasswordError"] = false
      this.setState(stateToChange)
      if(previousPassword !== this.props.activeUser.password){
        stateToChange["previousPasswordError"] = true
        stateToChange["previousPassword"] = previousPassword
        this.setState(stateToChange)
      }else{
        stateToChange["previousPassword"] = previousPassword
      }
    } else if(evt.target.id === "confirmPassword"){
      let confirmPassword = evt.target.value
      this.setState({confirmPasswordError: false, confirmPasswordFocus: true})
      if(this.state.password === confirmPassword){
        stateToChange["confirmPassword"] = confirmPassword
        this.setState(stateToChange)
      } else{
        stateToChange["confirmPasswordError"] = true
        this.setState(stateToChange)
        if(key === "Edit Profile"){
          stateToChange["confirmPassword"] = confirmPassword
        }
      }
    }
    else if(evt.target.id === "email"){
      let email = evt.target.value
      this.setState({emailFocus: true, emailError: false})
      if(!email.includes("@")){
        stateToChange["emailError"] = true
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
      if(key === "Edit Profile"){
        stateToChange["email"] = this.props.activeUser.email
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "username"){
      let username = evt.target.value
      this.setState({usernameError: false, usernameFocus: true})
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user => {
          if(user.username === username){
            stateToChange["usernameError"] = true
            this.setState(stateToChange)
          } else{
            stateToChange["username"] = username
            this.setState(stateToChange)
          }
        })
      })
      if(key === "Edit Profile"){
        stateToChange["username"] = this.props.activeUser.username
        this.setState(stateToChange)
      }
    }

    if(key === "Register"){
      if(evt.target.id === "securityQuestionAnswer"){
        stateToChange[evt.target.id] = evt.target.value
        stateToChange["securityQuestionAnswerFocus"] = true
        this.setState(stateToChange)
      }
      else if(evt.target.id === "terms"){
        let checkbox = evt.target
        if(checkbox.checked){
          stateToChange["terms"] = true
          // stateToChange["disabled"] = false
          this.setState(stateToChange)
        }
      }
    } else{
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }
  }

  handleDropdownChange =(e, {name, value}) => this.setState({ [name]: value})

  handleFormSubmit=(key)=>{
    if(key === "Log In"){
      APIManager.getAllCategory(`users/?q=${this.state.username}`).then(user => {
        if(user.length){
          if(user[0].password === this.state.password){
            this.props.loginFunction(user[0].id)
            // sessionStorage.setItem("id", user[0].id)
            this.setState({username: "", password: ""})
            return
          } else{
            console.log("the password provided is not what we have on file")
            return
          }
        } else{
          console.log("That user does not exist")
        }
      })
    } else if(key === "Register"){
      if(this.state.firstName !== "" || this.state.lastName !== "" || this.state.username !== "" || this.state.email !== "" || this.state.password !== "" || this.state.confirmPassword !== ""){
        let newUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          email: this.state.email,
          password: this.state.confirmPassword,
          terms: this.state.terms
        }
        this.props.createNewUser(newUser)
        this.setState({
          firstName: "",
          lastName: "",
          gender: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
          securityQuestion: "",
          sqAnswer: "",
        })
      document.querySelector("#confirmPassword").value = ""
    }
    } else if(key === "Edit Profile"){
      // let stateToChange = {}
      if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.username !== "" && this.state.email !== ""){
        if(this.state.confirmPassword !== ""){
          if(this.state.confirmPassword === this.state.password){
            let updatedUser = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              username: this.state.username,
              email: this.state.email,
              password: this.state.confirmPassword
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
  }

  isAuthenticated= ()=> sessionStorage.getItem("id") !== null

  render(){
    let displayVariable = ""
    if(this.isAuthenticated()){
      displayVariable = <UserSettings activeUser={this.props.activeUser} handleFieldChange={this.handleFieldChange} handleFormSubmit={this.handleFormSubmit} state={this.state}/>
    } else{
      displayVariable = <LogInRegister handleFieldChange={this.handleFieldChange} handleFormSubmit={this.handleFormSubmit} state={this.state} loginFunction={this.props.loginFunction} securityQuestions={this.props.securityQuestions}/>
    }
    return(
      <React.Fragment>
        <div className="user-management">
          <style>{`
            body > div > div,
            body > div > div > div.user-management{
              height: 100%
            }`}</style>
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450, height: '90vh'}}>
            <Header as="h2" color="teal" textAlign="center" content="Simplified Supper" />
              {displayVariable}
          </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }

}