import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'

//TODO: Add the ability to upload profile pic
//TODO: Insert placeholder profile pic if user does not want to upload their own
//FIXME: Error is not displaying anymore

const options =[
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
  {key: 'n', text: 'Prefer not to say', value: 'prefer not to say'}
]
export default class Register extends Component{

  render(){
    return(
      <React.Fragment>
        <Form onSubmit={()=>this.props.handleFormSubmit("Register")}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              placeholder="First Name"
              id="firstName"
              value={this.props.firstName}
              onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
              required
              focus={this.props.firstNameFocus}
              />
            <Form.Input
              fluid
              placeholder="Last Name"
              id="lastName"
              value={this.props.lastName}
              onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
              required
              focus={this.props.lastNameFocus}
            />
            <Form.Select
              fluid
              name="gender"
              options={options}
              placeholder="Gender"
              id="gender"
              onChange={this.props.handleDropdownChange}
            />
          </Form.Group>
          <Form.Input
            placeholder="Username"
            id="username"
            value={this.props.username}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
            required
            error={this.props.usernameError}
            focus={this.props.usernameFocus}
          />
          <Form.Input
            placeholder="Email Address"
            id="email"
            value={this.props.email}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
            required
            error={this.props.emailError}
            focus={this.props.emailFocus}
          />
          <Form.Input
            type="password"
            placeholder="Password"
            id="password"
            value={this.props.password}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
            required
            focus={this.props.passwordFocus}
          />
          <Form.Input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={this.props.confirmPassword}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
            required
            error={this.props.confirmPasswordError}
            focus={this.props.confirmPasswordFocus}
          />
          <Form.Select
            name="securityQuestion"
            options={this.props.securityQuestions}
            placeholder="Please Select a Security Question"
            id="securityQuestion"
            onChange={this.props.handleDropdownChange}
          />
          <Form.Input
            placeholder="Your Answer Here"
            id="securityQuestionAnswer"
            value={this.props.securityQuestionAnswer}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
            required
            focus={this.props.securityQuestionAnswerFocus}
          />
          <Form.Checkbox
            label="I agree to the Terms and Conditions"
            id="terms"
            checked={this.props.terms}
            onChange={(evt)=>this.props.handleFieldChange(evt, "Register")}
          />
          <Form.Button
            disabled={this.props.disabled}
            color="teal"
            content="Submit"
          />
        </Form>
      </React.Fragment>
    )
  }
}

