import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'


//TODO: Look at adding a 'remember me' option to the login form
export default class LogIn extends Component{

  render(){
    return(
      <React.Fragment>
      <Form onSubmit={()=>this.props.handleFormSubmit("Log In")}>
        <Form.Input
          id="username"
          label="Username"
          placeholder="Username"
          onChange={(evt)=>this.props.handleFieldChange(evt, "Log In")}
          value={this.props.username}
          required
        />
        <Form.Input
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          value={this.props.password}
          onChange={(evt)=>this.props.handleFieldChange(evt, "Log In")}
          required
        />
        <Form.Button
          content="Log In"
          color="teal"
          />
      </Form>
      </React.Fragment>
    )
  }
}