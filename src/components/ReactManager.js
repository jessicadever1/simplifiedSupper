import React, {Component} from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'

//TODO: Update navbar function to display dynamically based on if the user is logged in or not

export default class ReactManager extends Component{
  state={
    securityQuestions: [],
    activeUser: [],
    newUser: false,
  }

  componentDidMount=()=>{
    this.resetState()
  }

  resetState=()=>{
    APIManager.getAllCategory("securityQuestions").then((questions) => this.setState({securityQuestions: questions})).then(()=> {
      let currentUser= parseInt(sessionStorage.getItem("id"))
      if(isNaN(currentUser)){
        this.setState({activeUser: []})
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

  createNewUser=(newUser)=>{
    APIManager.saveItem("users", newUser)
    .then((user)=> {
      sessionStorage.setItem("id", user.id)
    })
    this.resetState()
    this.setState({newUser: true})
  }

  updateUserInfo=(updatedUser, id)=>{
    APIManager.updateItem("users", id, updatedUser).then((user)=> this.setState({activeUser: user}))
  }

  render(){
    return(
      <React.Fragment>
        <NavBar activeUser={this.state.activeUser} logoutFunction={this.logoutFunction}/>
        <ApplicationViews securityQuestions={this.state.securityQuestions} logoutFunction={this.logoutFunction} loginFunction={this.loginFunction} createNewUser={this.createNewUser} newUser={this.state.newUser} activeUser={this.state.activeUser}/>
      </React.Fragment>
    )
  }
}