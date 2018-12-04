import React, {Component} from 'react'
import Form from 'semantic-ui-react'

//TODO: Add the ability to upload profile pic
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
          <Form.Input label="Email Address" placeholder="Email Address"></Form.Input>
          <Form.Input label="Password" placeholder="Password"></Form.Input>
          <Form.Input label="Confirm Password" placeholder="Confirm Password"></Form.Input>
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button>Submit</Form.Button>
        </Form>

      </React.Fragment>
    )
  }
}

