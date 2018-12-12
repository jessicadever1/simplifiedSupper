import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import LogInRegister from './authentication/LogInRegister'
import Logout from './authentication/Logout'
import GetStarted from './getstarted/GetStarted';
import ViewProfile from './authentication/ViewUser'
import EditUser from './authentication/EditUser'
import Home from './HomePage/Home'
import SuggestedRecipes from './RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import RecipeModal from './RecipeComponents/RecipeModal/RecipeModal'

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
        <Route exact path="/EditProfile" render={(props)=>{
          return <EditUser activeUser={this.props.activeUser} updateUserInfo ={this.props.updateUserInfo}/>
        }} />
        <Route exact path="/SuggestedRecipes" render={(props)=> {
          return <SuggestedRecipes {...props}/>
          }} />
        <Route exact path="/RecipeCard" render={(props)=> {
          return <RecipeModal {...props} />
          }} />
      </React.Fragment>
    )
  }
}