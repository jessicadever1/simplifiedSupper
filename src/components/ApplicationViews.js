import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from './authentication/LogIn'
import Register from './authentication/Register';
import LogInRegister from './authentication/LogInRegister'
import Logout from './authentication/Logout'
import GetStarted from './getstarted/GetStarted';

export default class ApplicationViews extends Component{

  isNewUser = ()=> this.props.newUser !== false

  render(){
    return(
      <React.Fragment>
        <Route exact path="/" render={(props)=>{
          if(this.isNewUser()){
            return <Redirect to="/GetStarted" />
          } else{
            return <LogInRegister securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser}/>
          }
        }} />
        <Route exact path="/logout" render={(props)=>{
          return <Logout logoutFunction={this.props.logoutFunction}/>
        }} />
        <Route exact path="/GetStarted" render={(props)=>{
          return <GetStarted  activeUser={this.props.activeUser}/>
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