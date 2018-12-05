import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from './authentication/LogIn'
import Register from './authentication/Register';
import LogInRegister from './authentication/LogInRegister'
import Logout from './authentication/Logout'

export default class ApplicationViews extends Component{

  render(){
    return(
      <React.Fragment>
        <Route exact path="/" render={(props)=>{
          return <LogInRegister securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction}/>
        }} />
        <Route exact path="/logout" render={(props)=>{
          return <Logout logoutFunction={this.props.logoutFunction}/>
        }} />
        {/* <Route exact path="/login" render={(props)=>{
          return <Login />
        }} />
        <Route exact path="/register" render={(props)=>{
          return <Register />
        }} /> */}

      </React.Fragment>
    )
  }
}