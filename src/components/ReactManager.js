import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'

export default class ReactManager extends Component{
  state={
    securityQuestions: [],
    activeUser: []
  }

  componentDidMount=()=>{
    this.resetState()
  }

  resetState=()=>{
    APIManager.getAllCategory("securityQuestions").then((questions) => this.setState({securityQuestions: questions})).then(()=> {
      let currentUser= parseInt(sessionStorage.getItem("id"))
      console.log(currentUser)
      if(isNaN(currentUser)){
        this.setState({activeUser: []})
        console.log("No one is logged in")
      } else{
        APIManager.getOneFromCategory("users", currentUser)
        .then((user)=> this.setState({activeUser: user}))
      }
    })
  }

  loginFunction=(id)=>{
    sessionStorage.setItem("id", id)
    this.resetState()
  }

  logoutFunction =()=>{
    sessionStorage.removeItem("id")
    this.resetState();
  }

  render(){
    return(
      <React.Fragment>
        <NavBar activeUser={this.state.activeUser} logoutFunction={this.logoutFunction}/>
        <ApplicationViews securityQuestions={this.state.securityQuestions} logoutFunction={this.logoutFunction} loginFunction={this.loginFunction}/>
      </React.Fragment>
    )
  }
}