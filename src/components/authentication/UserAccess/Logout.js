import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Logout extends Component{
  componentDidMount=()=>{
    this.props.logoutFunction()
  }
  render(){
    return(
      <React.Fragment>
        <div>
          Thanks for trying Simplified Supper! You are now logged out. Come back y'all!
        </div>
        <Redirect to="/" />
      </React.Fragment>
    )
  }
}