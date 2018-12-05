import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

//TODO: Update field validation to be in realtime, and error messages to display inline, not as console logs
export default class LogIn extends Component{
  state={
    username: "",
    password: "",
  }

  handleFieldChange=(evt)=>{
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleFormSubmit=()=>{
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
  }

  render(){
    const {username, password} = this.state
    return(
      <React.Fragment>
      <Form onSubmit={this.handleFormSubmit}>
          <Form.Input id="username" label="Username" placeholder="Username"  onChange={this.handleFieldChange} value={username} required></Form.Input>
          <Form.Input id="password" label="Password" placeholder="Password" type="password" value={password} onChange={this.handleFieldChange} required></Form.Input>
          <Form.Button>Submit</Form.Button>
      </Form>
      </React.Fragment>
    )
  }
}