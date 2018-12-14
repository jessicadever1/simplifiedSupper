import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import APIManager from '../../../modules/APIManager';

//TODO: Screen 1: Get users email address or username
//TODO: Screen 2: Show security question and ask for the answer they have on file
//TODO: Screen 3: If security question answer matches what's on file, show new password and confirm password fields
//TODO: Screen 3b: If security question answer does not match, show failure screen and give the user 1 opportunity to try again, then lock them out
//TODO: Screen 4: If new password and confirm password matches, do a patch and log the user in

export default class ForgotPassword extends Component{
  state={
    userIdentification: false,
    uernameOrEmail: "",
    activeUser: [],
    securityQuestion: false,
    securityQuestionAnswer: "",
    correct: false,
    newPassword: false,
  }

  handleFieldChange=(evt)=>{
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleFormSubmit=(evt)=>{
    if(evt.target.id === "submitUserId"){
      APIManager.getAllCategory("users&_expand=securityQuestions")
      .then((users) => {
        console.log(users)
        // users.forEach(user =>{
        //   if(user.email === this.state.usernameOrEmail || user.username === this.state.usernameOrEmail){
        //     this.setState({activeUser: user})
        //   }
        // })
      })
      // .then(()=> APIManager.getOneFromCategory("securityQuestions", ))
    }
    if(evt.target.id === "submitSecurity"){
  }
}

  render(){
    if(this.state.userIdentification === false){
      return(
        <React.Fragment>
          <Form onSubmit={()=> this.handleFormSubmit()}>
            <Form.Input
              id="usernameOrEmail"
              label="Email or Username"
              placeholder="Email or Username"
              onChange={()=>this.handleFieldChange()}
            />
            <Form.Button
              id="submitUserId"
              color="teal"
              content="Submit"
            />
          </Form>
        </React.Fragment>
      )
    }
    if(this.state.securityQuestion === false){
      return(
        <React.Fragment>
          <Form onSubmit={()=> this.handleFormSubmit()}>
            <Form.Input
              id="securityQuestionAnswer"
              label={this.props.activeUser.securityQuestion_Id.text}
              placeholder="Your Answer"
              onChange={()=>this.handleFieldChange()} required
            />
            <Form.Button id="submitSecurity" color="teal" content="Submit"></Form.Button>
          </Form>
          <div></div>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>

      </React.Fragment>
    )
  }
}