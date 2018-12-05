import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

//TODO: Add the ability to upload profile pic
//TODO: Insert placeholder profile pic if user does not want to upload their own
//TODO: Select option values are not capturing correctly in state
//FIXME: If part of a username is taken it erases the username during typing with the set state function in handle field change
//FIXME: Update field validation to display error or success on change
/*
Then the system should check if the username is unique
And it should check if the email address is unique
And it should check if the password and confirmed password match
*/

// const options =[
//   {key: 'm', text: 'Male', value: 'male'},
//   {key: 'f', text: 'Female', value: 'female'},
//   {key: 'n', text: 'Prefer not to say', value: 'prefer not to say'}
// ]
export default class Register extends Component{
  state={
    firstName: "",
    lastName: "",
    // gender: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // securityQuestion: "",
    // sqAnswer: "",
    terms: false,
    errorMessage: ""
  }

  handleFieldChange =(evt)=>{
    const stateToChange = {}
    if(evt.target.id === "email"){
      let email = evt.target.value
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user => {
          if(user.email === email){
            stateToChange["email"] = ""
            this.setState(stateToChange)
          } else{
            stateToChange["email"] = email
            this.setState(stateToChange)
          }
        })
      })
    } else if(evt.target.id === "username"){
      let username = evt.target.value
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user => {
          if(user.username === username){
            stateToChange["username"] = ""
            this.setState(stateToChange)
          } else{
            stateToChange["username"] = username
            this.setState(stateToChange)
          }
        })
      })
    } else if(evt.target.id === "confirmPassword"){
      let password = evt.target.value
      if(this.state.password === password){
        stateToChange["confirmPassword"] = password
        this.setState(stateToChange)
      } else{
        console.log("passwords do not match")
        stateToChange["confirmPassword"] = ""
        this.setState(stateToChange)
      }
    } else if(evt.target.id === "terms"){
      let checkbox = evt.target
      if(checkbox.checked){
        stateToChange["terms"] = true
        this.setState(stateToChange)
      } else{
        stateToChange["terms"] = false
        this.setState(stateToChange)
      }
    }
    else {
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }
  }

  handleFormSubmit=()=>{
    if(this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === ""){
      alert("please fill out all required fields")
    } else if(this.state.terms === false){
      alert("please agree to the terms and conditions")
      return
    }
    else{
      let newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.confirmPassword,
        terms: this.state.terms
      }
      APIManager.saveItem("users", newUser).then((user)=> {
        sessionStorage.setItem("id", user.id)
        this.setState({
          firstName: "",
          lastName: "",
          // gender: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
          // securityQuestion: "",
          // sqAnswer: "",
        })
      document.querySelector("#confirmPassword").value = ""
    })
    }
  }

  render(){
    const {firstName, lastName, username, email, password, terms} = this.state
    return(
      <React.Fragment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="First Name" placeholder="First Name" id="firstName" value={firstName} onChange={this.handleFieldChange} required></Form.Input>
            <Form.Input fluid label="Last Name" placeholder="Last Name" id="lastName" value={lastName} onChange={this.handleFieldChange}required></Form.Input>
            {/* <Form.Select fluid label="Gender" options={options} placeholder="Gender" id="gender" onChange={this.handleFieldChange}/> */}
          </Form.Group>
          <Form.Input label="Username" placeholder="Username" id="username" value={username} onChange={this.handleFieldChange}required></Form.Input>
          <Form.Input label="Email Address" placeholder="Email Address" id="email" value={email} onChange={this.handleFieldChange} required ></Form.Input>
          <Form.Input label="Password" type="password" placeholder="Password" id="password" value={password} onChange={this.handleFieldChange}required></Form.Input>
          <Form.Input label="Confirm Password" type="password" placeholder="Confirm Password" id="confirmPassword" onChange={this.handleFieldChange} required></Form.Input>
          {/* <Form.Select label="Please Select a Security Question" options={this.props.securityQuestions} placeholder="Please Select a Security Question" id="securityQuestion" onChange={this.handleFieldChange}/> */}
          {/* <Form.Input label="Your Answer to the Security Question" placeholder="Your Answer Here" id="sqAnswer" value={sqAnswer} required></Form.Input> */}
          <Form.Checkbox label="I agree to the Terms and Conditions" id="terms" checked={terms} onChange={this.handleFieldChange} />
          <Form.Button>Submit</Form.Button>
        </Form>
      </React.Fragment>
    )
  }
}

