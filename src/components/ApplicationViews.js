import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
// import Login from './authentication/LogIn'
// import Register from './authentication/Register';
import LogInRegister from './authentication/LogInRegister'
import Logout from './authentication/Logout'
import GetStarted from './getstarted/GetStarted';
import ViewProfile from './authentication/ViewUser'
import Home from './home/home'
import SuggestedRecipes from './getstarted/SuggestedRecipes';
import RecipeCard from './recipeSuggestionEngine/RecipeCard';

export default class ApplicationViews extends Component{

  isNewUser = ()=> this.props.newUser !== false

  isAuthenticated = ()=> sessionStorage.getItem("id") !== null

  render(){
    return(
      <React.Fragment>
        <Route exact path="/" render={(props)=>{
          if(this.isNewUser()){
            return <Redirect to="/GetStarted" />
          } else if(this.isAuthenticated()){
            return <Home />
          }else{
            return <LogInRegister securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser}/>
          }
        }} />
        <Route exact path="/logout" render={(props)=>{
          return <Logout logoutFunction={this.props.logoutFunction}/>
        }} />
        <Route exact path="/GetStarted" render={(props)=>{
          return <GetStarted  {...props} activeUser={this.props.activeUser}/>
        }} />
        <Route exact path="/ViewProfile" render={(props)=>{
          return <ViewProfile activeUser={this.props.activeUser}/>
        }} />
        <Route exact path="/SuggestedRecipes" render={(props)=> {
          return <SuggestedRecipes {...props}/>
        }} />
        <Route exact path="/RecipeCard" render={(props)=> {
          return <RecipeCard {...props} />
        }} />


      </React.Fragment>
    )
  }
}