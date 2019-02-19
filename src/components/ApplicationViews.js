import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Logout from './authentication/UserAccess/Logout'
import GetStarted from './getstarted/GetStarted';
import Home from './HomePage/Home'
import SuggestedRecipes from './RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import RecipeModal from './RecipeComponents/RecipeModal/RecipeModal'
import UserManagement from './authentication/UserManagement';

export default class ApplicationViews extends Component{

  is_new_user = ()=> this.props.new_user !== false

  is_authenticated = ()=> sessionStorage.getItem("id") !== null

  render(){
    return(
      <React.Fragment>
        <Route exact path="/" render={(props)=>{
          if(this.is_new_user()){
            return <Redirect to="/GetStarted" />
          } else if(this.is_authenticated()){
            return <Home active_user={this.props.active_user}/>
          }else{
            return <UserManagement security_questions ={this.props.security_questions} login_function={this.props.login_function} create_new_user={this.props.create_new_user} active_user={this.props.active_user}/>
          }
        }} />
        <Route exact path="/logout" render={(props)=>{
          return <Logout logout_function={this.props.logout_function}/>
        }} />
        <Route exact path="/GetStarted" render={(props)=>{
          return <GetStarted  {...props} activeUser={this.props.active_user}/>
        }} />
        <Route exact path="/ViewProfile" render={(props)=>{
            return <UserManagement security_questions={this.props.security_questions} login_function={this.props.login_function} create_new_user={this.props.create_new_user} active_user={this.props.active_user} />
        }} />
        <Route exact path="/SuggestedRecipes" render={(props)=> {
          if(this.is_authenticated()){
            return <SuggestedRecipes {...props}/>
          } else{
            return <UserManagement security_questions={this.props.security_questions} login_function={this.props.login_function} create_new_user={this.props.create_new_user} active_user={this.props.active_user}/>
          }
          }} />
        <Route exact path="/RecipeCard" render={(props)=> {
          if(this.is_authenticated()){
            return <RecipeModal {...props} />
          } else{
            return <UserManagement security_questions={this.props.security_questions} login_function={this.props.login_function} create_new_user={this.props.create_new_user} active_user={this.props.active_user} />
          }
          }} />
      </React.Fragment>
    )
  }
}