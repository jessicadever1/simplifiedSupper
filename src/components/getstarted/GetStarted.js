/*

When the user clicks any of the recipe cards, they will be taken to the appropriate recipe details (see #6 )
And be given the affordance to select the date they would like to make that recipe
*/

import React, {Component} from 'react'
import GetStartedCategory from './GetStartedCategory'
import GetStartedDish from './GetStartedDish'
// import GetStartedProtein from './GetStartedProtein'
import SuggestedRecipes from '../RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import APIManager from '../../modules/APIManager';
import moment from 'moment'

//TODO: Find a way to store where the user is in the get started process so you can come back to the phase in the process if they leave before completion
export default class GetStarted extends Component{
  state={
    category: "",
    dish: "",
    selectedCategory: false,
    selectedDish: false,
    open: false,
    matches: []
  }
  handleDropdownChange =(e, {name, value}) => this.setState({ [name]: value})

  handleButtonClick=(evt)=>{
    if(evt.target.id === "category"){
      this.setState({selectedCategory: true})
      return
    } else if(evt.target.id === "dish"){
      let matchedRecipes = []
      let courseMatch=[]
      let AssignedCourse = ""
      if(this.state.dish === "Main+Dishes" || this.state.dish === "Side+Dishes" || this.state.dish === "Lunch+and+Snacks"){
        if(this.state.dish === "Main+Dishes"){
          AssignedCourse = "Main Dishes"
        } else if(this.state.dish === "Side+Dishes"){
          AssignedCourse = "Side Dishes"
        } else if(this.state.dish === "Lunch+and+Snacks"){
          AssignedCourse = "Lunch and Snacks"
        }
      } else{
        AssignedCourse = this.state.dish
      }
      APIManager.getAllCategory("recipes")
      .then(recipes => {
        recipes.forEach(recipe =>{
          recipe.attributes.course.forEach(course=>{
            if(course === AssignedCourse){
              courseMatch.push(recipe)
            }
          })
        })
        courseMatch.forEach(course =>{
          if(course.attributes.cuisine){
            course.attributes.cuisine.forEach(cuisine =>{
              if(cuisine.toLowerCase() === this.state.category){
                if(matchedRecipes.length === 0){
                  matchedRecipes.push(course)
                } else{
                  if(!matchedRecipes.find(recipe => recipe.id === course.id)){
                    matchedRecipes.push(course)
                  }
                }
              }
            })
          }
        })
        this.setState({
          matches: matchedRecipes,
          selectedDish: true
        })
      })
    } else if(evt.target.id === "startOver"){
      this.setState({
        selectedCategory: false,
        selectedDish: false,
        matches: [],
        category: "",
        dish: ""
      })
    }
  }

  handleCalendarChange=(evt, id)=>{
    let newRecipe ={
      userId: parseInt(sessionStorage.getItem("id")),
      recipeId: id,
      date: moment(evt.target.value)
    }
    APIManager.saveItem("usersRecipes", newRecipe)
    .then(()=> this.props.history.push("/"))
  }

  render(){
    if(this.state.selectedCategory === false){
      return <GetStartedCategory handleButtonClick={this.handleButtonClick} activeUser={this.props.activeUser} handleDropdownChange={this.handleDropdownChange}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === false){
      return <GetStartedDish handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange} category={this.state.category}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === true){
      return <SuggestedRecipes handleCalendarChange={this.handleCalendarChange} matches={this.state.matches} category={this.state.category} dish={this.state.dish} handleButtonClick={this.handleButtonClick}/>
    }
  }
}