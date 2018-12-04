import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'

export default class LogIn extends Component{

  render(){
    return(
      <React.Fragment>
      <Form>
          <Form.Input label="Username" placeholder="Username"></Form.Input>
          <Form.Input label="Password" placeholder="Password"></Form.Input>
          <Form.Button>Submit</Form.Button>
      </Form>
      </React.Fragment>
    )
  }
}