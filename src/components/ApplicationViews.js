import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Logout from './authentication/UserAccess/Logout'
import GetStarted from './getstarted/GetStarted';
import Home from './HomePage/Home'
import SuggestedRecipes from './RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import RecipeModal from './RecipeComponents/RecipeModal/RecipeModal'
import UserManagement from './authentication/UserManagement';

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
            return <Home activeUser={this.props.activeUser}/>
          }else{
            return <UserManagement securityQuestions ={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser} activeUser={this.props.activeUser}/>
          }
        }} />
        <Route exact path="/logout" render={(props)=>{
          return <Logout logoutFunction={this.props.logoutFunction}/>
        }} />
        <Route exact path="/GetStarted" render={(props)=>{
          return <GetStarted  {...props} activeUser={this.props.activeUser}/>
        }} />
        <Route exact path="/ViewProfile" render={(props)=>{
            return <UserManagement securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser} activeUser={this.props.activeUser} />
        }} />
        <Route exact path="/SuggestedRecipes" render={(props)=> {
          if(this.isAuthenticated()){
            return <SuggestedRecipes {...props}/>
          } else{
            return <UserManagement securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser} activeUser={this.props.activeUser}/>
          }
          }} />
        <Route exact path="/RecipeCard" render={(props)=> {
          if(this.isAuthenticated()){
            return <RecipeModal {...props} />
          } else{
            return <UserManagement securityQuestions={this.props.securityQuestions} loginFunction={this.props.loginFunction} createNewUser={this.props.createNewUser} activeUser={this.props.activeUser} />
          }
          }} />
      </React.Fragment>
    )
  }
}