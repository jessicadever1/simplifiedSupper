import React, {Component} from 'react'
import GetStartedCategory from './GetStartedCategory'
import GetStartedDish from './GetStartedDish'
import SuggestedRecipes from '../RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import APIManager from '../../modules/APIManager';

//TODO: Find a way to store where the user is in the get started process so you can come back to the phase in the process if they leave before completion
export default class GetStarted extends Component{
  state={
    category: "",
    dish: "",
    selectedCategory: false,
    selectedDish: false,
    open: false,
    showRecipe: false,
    getStarted: true,
    activeRecipeKey: "",
    recipeDetails: [],
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

  closeRecipeDetails=()=>{
    this.setState({showRecipe: false, open: false})
  }

  seeRecipeDetails=(id, num)=>{
    APIManager.getRecipeDetails(id)
    .then((response)=>{
    this.setState({
      recipeDetails: response,
      activeRecipeKey: num,
      showRecipe: true,
      open: true,
    })
  }
    )
  }

  handleCalendarChange=(key, id, date)=>{
    if(key === "newRecipe"){
      let newRecipe={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        recipe_Num: this.state.activeRecipeKey,
        date: date
      }
      APIManager.saveItem("usersRecipes", newRecipe)
      .then(()=> this.props.history.push("/"))
    }
  }

  render(){
    if(this.state.selectedCategory === false){
      return <GetStartedCategory handleButtonClick={this.handleButtonClick} activeUser={this.props.activeUser} handleDropdownChange={this.handleDropdownChange}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === false){
      return <GetStartedDish handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange} category={this.state.category}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === true){
      return <SuggestedRecipes handleCalendarChange={this.handleCalendarChange} matches={this.state.matches} category={this.state.category} dish={this.state.dish} handleButtonClick={this.handleButtonClick} seeRecipeDetails={this.seeRecipeDetails} closeRecipeDetails={this.closeRecipeDetails} getStarted={this.state.getStarted} recipeDetails={this.state.recipeDetails} activeRecipeKey={this.state.activeRecipeKey} showRecipe={this.state.showRecipe} open={this.state.open}/>
    }
}
}