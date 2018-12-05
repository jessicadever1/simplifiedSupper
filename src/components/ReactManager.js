import React, {Component} from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'

export default class ReactManager extends Component{
  state={
    securityQuestions: [],
  }

  componentDidMount=()=>{
    APIManager.getAllCategory("securityQuestions").then((questions) => this.setState({securityQuestions: questions}))
  }

  render(){
    return(
      <React.Fragment>
        <NavBar />
        <ApplicationViews securityQuestions={this.state.securityQuestions}/>
      </React.Fragment>
    )
  }
}