import React, {Component} from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'

export default class ReactManager extends Component{
  state={
    security_questions: [],
    active_user: [],
    new_user: false,
  }

  componentDidMount=()=>{
    this.reset_state()
  }

  reset_state=()=>{
    APIManager.getAllCategory("securityQuestions").then((questions) => this.setState({security_questions: questions})).then(()=> {
      let current_user= parseInt(sessionStorage.getItem("id"))
      if(isNaN(current_user)){
        this.setState({active_user: []})
      } else{
        APIManager.getOneFromCategory("users", current_user)
        .then((user)=> this.setState({active_user: user}))
      }
    })
  }

  login_function=(id)=>{
    sessionStorage.setItem("id", id)
    this.reset_state()
  }

  logout_function =()=>{
    sessionStorage.removeItem("id")
    this.reset_state();
  }

  create_new_user=(new_user)=>{
    APIManager.saveItem("users", new_user)
    .then((user)=> {
      sessionStorage.setItem("id", user.id)
    })
    this.reset_state()
    this.setState({new_user: true})
  }

  update_user_info=(updated_user, id)=>{
    APIManager.updateItem("users", id, updated_user).then((user)=> this.setState({active_user: user}))
  }

  render(){
    return(
      <React.Fragment>
        <NavBar active_user={this.state.active_user} logout_function={this.logout_function}/>
        <ApplicationViews security_questions={this.state.security_questions} logout_function={this.logout_function} login_function={this.login_function} create_new_user={this.create_new_user} new_user={this.state.new_user} active_user={this.state.active_user}/>
      </React.Fragment>
    )
  }
}