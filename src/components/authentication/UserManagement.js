import React, {Component} from 'react'
import {Header, Grid} from 'semantic-ui-react'
import LogInRegister from './UserAccess/LogInRegister'
import APIManager from '../../modules/APIManager'
import UserSettings from './UserSettings/UserSettings';

//TODO: Add Simplified Supper logo to header
//TODO: Capture security question id before post
//TODO: Password should be at least 7 characters
//TODO: Need to make sure that the submit button becomes active from anywhere as soon as the form is filled out and does not contain errors.
//TODO: Update field validation to be in realtime, and error messages to display inline, not as console logs
//TODO: Set up validation that happens and displays errors in real time, if any of the conditions are not met, the user is not able to press the save button
//TODO: Update focus functionality using refs instead of individual states

export default class UserManagement extends Component{
  state={
    first_name: "",
    last_name: "",
    gender: "",
    username: "",
    email: "",
    previous_password: "",
    password: "",
    confirm_password: "",
    security_question: "",
    security_question_answer: "",
    terms: false,
    first_name_error: false,
    last_name_error: false,
    username_error: false,
    email_error: false,
    password_error: false,
    confirm_password_error: false,
    previous_password_error: false,
    first_name_focus: false,
    last_name_focus: false,
    username_focus: false,
    email_focus: false,
    previous_password_focus: false,
    password_focus: false,
    confirm_password_focus: false,
    security_question_answer_focus: false,
    disabled: false
  }

  handle_field_change=(evt, key)=>{
    let state_to_change ={}
    // this.setState({disabled: true})
    if(evt.target.id === "first_name"){
      state_to_change[evt.target.id] = evt.target.value
      state_to_change["first_name_focus"] = true
      this.setState(state_to_change)
    } else if(evt.target.id === "last_name"){
      state_to_change[evt.target.id] = evt.target.value
      state_to_change["last_name_focus"] = true
      this.setState(state_to_change)
    } else if(evt.target.id === "password"){
      state_to_change[evt.target.id] = evt.target.value
      state_to_change["password_focus"] = true
      this.setState(state_to_change)
    } else if(evt.target.id === "previous_password"){
      let previous_password = evt.target.value
      state_to_change["previous_password_focus"] = true
      state_to_change["previous_password_error"] = false
      this.setState(state_to_change)
      if(previous_password !== this.props.active_user.password){
        state_to_change["previous_password_error"] = true
        state_to_change["previous_password"] = previous_password
        this.setState(state_to_change)
      }else{
        state_to_change["previous_password"] = previous_password
      }
    } else if(evt.target.id === "confirm_password"){
      let confirm_password = evt.target.value
      this.setState({confirm_password_error: false, confirm_password_focus: true})
      if(this.state.password === confirm_password){
        state_to_change["confirm_password"] = confirm_password
        this.setState(state_to_change)
      } else{
        state_to_change["confirm_password_error"] = true
        this.setState(state_to_change)
        if(key === "Edit Profile"){
          state_to_change["confirm_password"] = confirm_password
        }
      }
    }
    else if(evt.target.id === "email"){
      let email = evt.target.value
      this.setState({email_focus: true, email_error: false})
      if(!email.includes("@")){
        state_to_change["email_error"] = true
        this.setState(state_to_change)
      }
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user =>{
          if(user.email === email){
            state_to_change["email_error"] = true
            this.setState(state_to_change)
          } else{
            state_to_change["email"] = email
            this.setState(state_to_change)
          }
        })
      })
      if(key === "Edit Profile"){
        state_to_change["email"] = this.props.active_user.email
        this.setState(state_to_change)
      }
    } else if(evt.target.id === "username"){
      let username = evt.target.value
      this.setState({username_error: false, username_focus: true})
      APIManager.getAllCategory("users").then(users => {
        users.forEach(user => {
          if(user.username === username){
            state_to_change["username_error"] = true
            this.setState(state_to_change)
          } else{
            state_to_change["username"] = username
            this.setState(state_to_change)
          }
        })
      })
      if(key === "Edit Profile"){
        state_to_change["username"] = this.props.active_user.username
        this.setState(state_to_change)
      }
    }

    if(key === "Register"){
      if(evt.target.id === "security_question_answer"){
        state_to_change[evt.target.id] = evt.target.value
        state_to_change["security_question_answer_focus"] = true
        this.setState(state_to_change)
      }
      else if(evt.target.id === "terms"){
        let checkbox = evt.target
        console.log(checkbox)
        if(checkbox.checked){
          state_to_change["terms"] = true
          // state_to_change["disabled"] = false
          this.setState(state_to_change)
        }
      }
    } else{
      state_to_change[evt.target.id] = evt.target.value
      this.setState(state_to_change)
    }
  }

  handle_dropdown_change =(e, {name, value}) => this.setState({ [name]: value})

  handle_form_submit=(key)=>{
    if(key === "Log In"){
      APIManager.getAllCategory(`users/?q=${this.state.username}`).then(user => {
        if(user.length){
          if(user[0].password === this.state.password){
            this.props.login_function(user[0].id)
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
    } else if(key === "Register"){
      if(this.state.first_name !== "" || this.state.last_name !== "" || this.state.username !== "" || this.state.email !== "" || this.state.password !== "" || this.state.confirm_password !== ""){
        let new_user = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.confirm_password,
          terms: this.state.terms
        }
        this.props.create_new_user(new_user)
        this.setState({
          first_name: "",
          last_name: "",
          gender: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          terms: false,
          security_question: "",
          sqAnswer: "",
        })
      document.querySelector("#confirm_password").value = ""
    }
    } else if(key === "Edit Profile"){
      // let state_to_change = {}
      if(this.state.first_name !== "" && this.state.last_name !== "" && this.state.username !== "" && this.state.email !== ""){
        if(this.state.confirm_password !== ""){
          if(this.state.confirm_password === this.state.password){
            let updated_user = {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              username: this.state.username,
              email: this.state.email,
              password: this.state.confirm_password
            }
            APIManager.updateItem("users", this.props.active_user.id, updated_user)
          } else{
            console.log("Your passwords must match to save changes")
          }
        } else{
          let updated_user={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            email: this.state.email,
            password: this.props.active_user.password
          }
          this.props.update_user_info(updated_user, this.props.active_user.id)
        }
      } else{
        console.log("please fill out all fields")
      }
    }
  }

  is_authenticated= ()=> sessionStorage.getItem("id") !== null

  render(){
    let display_variable = ""
    if(this.is_authenticated()){
      display_variable = <UserSettings active_user={this.props.active_user} handle_field_change={this.handle_field_change} handle_form_submit={this.handle_form_submit} state={this.state}/>
    } else{
      display_variable = <LogInRegister handle_field_change={this.handle_field_change} handle_form_submit={this.handle_form_submit} state={this.state} login_function={this.props.login_function} security_questions={this.props.security_questions}/>
    }
    return(
      <React.Fragment>
        <div className="user-management">
          <style>{`
            body > div > div,
            body > div > div > div.user-management{
              height: 100%
            }`}</style>
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450, height: '90vh'}}>
            <Header as="h2" color="teal" textAlign="center" content="Simplified Supper" />
              {display_variable}
          </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }

}