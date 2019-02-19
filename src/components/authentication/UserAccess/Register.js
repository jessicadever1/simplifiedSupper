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
        <Form onSubmit={()=>this.props.handle_form_submit("Register")}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              placeholder="First Name"
              id="first_name"
              value={this.props.first_name}
              onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
              required
              focus={this.props.first_name_focus}
              />
            <Form.Input
              fluid
              placeholder="Last Name"
              id="lastName"
              value={this.props.last_name}
              onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
              required
              focus={this.props.last_name_focus}
            />
            <Form.Select
              fluid
              name="gender"
              options={options}
              placeholder="Gender"
              id="gender"
              onChange={this.props.handle_dropdown_change}
            />
          </Form.Group>
          <Form.Input
            placeholder="Username"
            id="username"
            value={this.props.username}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
            required
            error={this.props.username_error}
            focus={this.props.username_focus}
          />
          <Form.Input
            placeholder="Email Address"
            id="email"
            value={this.props.email}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
            required
            error={this.props.email_error}
            focus={this.props.email_focus}
          />
          <Form.Input
            type="password"
            placeholder="Password"
            id="password"
            value={this.props.password}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
            required
            focus={this.props.password_focus}
          />
          <Form.Input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={this.props.confirm_password}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
            required
            error={this.props.confirm_password_error}
            focus={this.props.confirm_password_focus}
          />
          <Form.Select
            name="securityQuestion"
            options={this.props.security_questions}
            placeholder="Please Select a Security Question"
            id="securityQuestion"
            onChange={this.props.handle_dropdown_change}
          />
          <Form.Input
            placeholder="Your Answer Here"
            id="securityQuestionAnswer"
            value={this.props.security_question_answer}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
            required
            focus={this.props.security_question_answer_focus}
          />
          <Form.Checkbox
            label="I agree to the Terms and Conditions"
            id="terms"
            checked={this.props.terms}
            onChange={(evt)=>this.props.handle_field_change(evt, "Register")}
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

