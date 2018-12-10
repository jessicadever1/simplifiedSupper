import React, {Component} from 'react'
// import {Redirect} from 'react-router-dom'
import {Form} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

//TODO: Add the ability to upload profile pic
//TODO: Insert placeholder profile pic if user does not want to upload their own
//FIXME: Update field validation to display error or success on change (Look at username validation for example. this is working code. EOD Friday 12/7)
//TODO: Capture security question id before post
//TODO: Password should be at least 7 characters
//TODO: Email must include an @ symbol
//TODO: Need to make sure that the submit button becomes active from anywhere as soon as the form is filled out and does not contain errors.
//TODO: Update focus functionality using refs instead of individual states
//TODO: Consider updating format to not include labels?
/*
Then the system should check if the username is unique
And it should check if the email address is unique
And it should check if the password and confirmed password match
*/

const options =[
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
  {key: 'n', text: 'Prefer not to say', value: 'prefer not to say'}
]
export default class Register extends Component{
  state={
    firstName: "",
    lastName: "",
    gender: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    sqAnswer: "",
    terms: false,
    errorMessage: "",
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    firstNameFocus: false,
    lastNameFocus: false,
    usernameFocus: false,
    emailFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false,
    sqAnswerFocus: false,
    disabled: false,
  }

  handleDropdownChange =(e, {name, value}) => this.setState({ [name]: value})

  handleFieldChange =(evt)=>{
    const stateToChange = {}
    this.setState({disabled: true})
     if(evt.target.id === "email"){
      let email = evt.target.value
      this.setState({emailFocus: true, emailError: false})
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user => {
          if(user.email === email){
            stateToChange["emailError"] = true
            this.setState(stateToChange)
          } else{
            stateToChange["email"] = email
            this.setState(stateToChange)
          }
        })
      })
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
    } else if(evt.target.id === "confirmPassword"){
      let password = evt.target.value
      this.setState({passwordError: false, confirmPasswordFocus: true})
      if(this.state.password === password){
        stateToChange["confirmPassword"] = password
        this.setState(stateToChange)
      } else{
        stateToChange["passwordError"] = true
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "terms"){
      let checkbox = evt.target
      if(checkbox.checked){
        stateToChange["terms"] = true
        this.setState(stateToChange)
        if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.gender !== "" && this.state.username !== "" && this.state.email !== "" && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.securityQuestion !== "" && this.state.terms === true && this.state.sqAnswer  !== "" && this.state.firstNameError === false && this.state.lastNameError === false && this.state.usernameError === false && this.state.emailError === false && this.state.passwordError === false){
          stateToChange["disabled"] = false
          this.setState(stateToChange)
        }
      } else{
        stateToChange["terms"] = false
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "firstName"){
      this.setState({firstNameFocus: true})
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    } else if(evt.target.id === "lastName"){
      this.setState({lastNameFocus: true})
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    } else if(evt.target.id === "password"){
      this.setState({passwordFocus: true})
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    } else if(evt.target.id === "sqAnswer"){
      this.setState({sqAnswerFocus: true})
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }
    else {
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }
  }

  handleFormSubmit=()=>{
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
    }

  render(){
    const {firstName, lastName, username, email, password, terms, sqAnswer} = this.state
    return(
      <React.Fragment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              placeholder="First Name"
              id="firstName"
              value={firstName}
              onChange={this.handleFieldChange}
              required
              error={this.state.firstNameError}
              focus={this.state.firstNameFocus}
            />
            <Form.Input
              fluid
              label="Last Name"
              placeholder="Last Name"
              id="lastName"
              value={lastName}
              onChange={this.handleFieldChange}
              required
              error={this.state.lastNameError}
              focus={this.state.lastNameFocus}
            />
            <Form.Select
              fluid
              label="Gender"
              name="gender"
              options={options}
              placeholder="Gender"
              id="gender"
              onChange={this.handleDropdownChange}
            />
          </Form.Group>
          <Form.Input
            label="Username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={this.handleFieldChange}
            required
            error={this.state.usernameError}
            focus={this.state.usernameFocus}
          />
          <Form.Input
            label="Email Address"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={this.handleFieldChange}
            required
            error={this.state.emailError}
            focus={this.state.emailFocus}
          />
          <Form.Input
            label="Password"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={this.handleFieldChange}
            required
            focus={this.state.passwordFocus}
          />
          <Form.Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            onChange={this.handleFieldChange}
            required
            error={this.state.passwordError}
            focus={this.state.passwordFocus}
          />
          <Form.Select
            label="Please Select a Security Question"
            name="securityQuestion"
            options={this.props.securityQuestions}
            placeholder="Please Select a Security Question"
            id="securityQuestion"
            onChange={this.handleDropdownChange}
          />
          <Form.Input
            label="Your Answer to the Security Question"
            placeholder="Your Answer Here"
            id="sqAnswer"
            value={sqAnswer}
            onChange={this.handleFieldChange}
            required
            focus={this.state.sqAnswerFocus}
          />
          <Form.Checkbox
            label="I agree to the Terms and Conditions"
            id="terms"
            checked={terms}
            onChange={this.handleFieldChange}
          />
          <Form.Button disabled={this.state.disabled}>Submit</Form.Button>
        </Form>
      </React.Fragment>
    )
  }
}

