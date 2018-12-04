import React, {Component} from 'react'
import Form from 'semantic-ui-react'

export default class Register extends Component{

  render(){
    return(
      <React.Fragment>
        <Form>
        <Form.Group widths="equal">
          <Form.Input label="First Name" placeholder="First Name"></Form.Input>
          <Form.Input label="Last Name" placeholder="Last Name"></Form.Input>
        </Form.Group>
        <Form.Input label="Username" placeholder="Username"></Form.Input>
        </Form>

      </React.Fragment>
    )
  }
}

