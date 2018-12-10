/*
Given an active user has selected at least one meal during the week
When the user is viewing the calendar
Then a recipe suggestion engine will display recipes with the highest percentage of similar ingredients to the recipe already in their calendar along with a percentage of similar ingredients

When the user adds a new recipe to their calendar
Then the recipe suggestion engine will update with new recipes based on the combined ingredients of all selected recipes
*/

import React, {Component} from 'react'
import APIManager from '../../../modules/APIManager'
import BuildSuggestions from './BuildSuggestions'

export default class RecipeSuggestionEngine extends Component{
  state={
    recipeDetails: [],
    ingredients: [],
    recipeIngredients: [],
  }

  componentDidMount=()=>{
    this.updateData()
  }

  updateData=()=>{
    let ingredients= []
    APIManager.getAllCategory("ingredients")
    .then((data)=>{
      data.forEach(item =>{
        ingredients.push(item.term)
      })
    })
    .then(()=>APIManager.getAllCategory("usersRecipes?_expand=user"))
    .then((usersRecipes)=>{
      let recipes = []
      usersRecipes.forEach(recipe => {
        if(recipe.userId === parseInt(sessionStorage.getItem("id"))){
          recipes.push(APIManager.getRecipeDetails(recipe.recipeId)
          .then((recipeDetails)=>{
            let expandedRecipe ={
              id: recipe.recipeId,
              eventId: recipe.id,
              title: recipeDetails.name,
              date: recipe.date,
              recipeDetails: recipeDetails
            }
            return expandedRecipe
          })
          )
        }
      })
      return Promise.all(recipes)
    })
    .then(data =>{
      this.setState({recipeDetails: data, ingredients: ingredients})
      // this.updateDatabase()
      this.splitIngredients()
    })
    .then(()=> this.percentageMatchCalculator())
  }

  splitIngredients=()=>{
    let recipes = this.state.recipeDetails
    let ingredients = []
    let unfoundIngredient = []
    let data=[]
    let newData = []
    let numbers =["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1/2", "1/4", "1/8", "3/4", "⅛", "⅓", "½", "(100", "(80"]
    let measurements =["cups", "teaspoon", "tablespoon", "tsp.", "Tbsp.", "tbsp", "T", "cup", "g", "tablespoons", "lb.", "head", "g)", "handful", "cloves", "florets", "large"]
    let other=["optional", "Check", "of", "and", "for", "(optional)", "(see", "trimming", "instructions)"]
    let cookingStates=["uncooked", "chopped", "sliced", "ground", "halved", "garnish", "separated", "fresh", "thinly", "diced"]
    recipes.forEach(recipe =>{
      recipe.recipeDetails.ingredientLines.forEach(ingredient =>{
        let splitIngredients = ingredient.split(" ")
        .filter(val => !numbers.includes(val))
        .filter(val => !measurements.includes(val))
        .filter(val => !other.includes(val))
        .filter(val => !cookingStates.includes(val))
        .join(" ")
        .toLowerCase()
        data.push(splitIngredients)
      })
      })
      data.forEach((item, index) => {
        if(item.includes(",")){
          let newItem = item.split(",").shift()
          data.splice(index, 1, newItem)
        }
      })

      data.forEach((ingredient, index) => {
        let correctIngredients = this.state.ingredients.map(item => item.toLowerCase())
        if(correctIngredients.includes(ingredient)){
          let updatedIngredient = correctIngredients.find(value => ingredient === value)
          data.splice(index, 1, updatedIngredient)
        } else{
          correctIngredients.forEach(item => {
            if(ingredient.includes(item)){
              // console.log("item", item, "ingredient", ingredient)
            }
            // if(item.includes(ingredient)){
            //   let updatedIngredient = correctIngredients.find(value => value.includes(ingredient))
            //   data.splice(index, 1, updatedIngredient)
            //   console.log("updatedIngredients", updatedIngredient)
            //   // console.log("item", item, "ingredient", ingredient)
            // }
            // else if(!item.includes(ingredient)){
              // return
            // } else{
              // let updatedIngredient = "N/A"
              // data.splice(index, 1, updatedIngredient)
              // unfoundIngredient.push(ingredient)
            // }
          })
        }
      })
      unfoundIngredient.forEach((item, index) =>{
        let correctIngredients = this.state.ingredients.map(item => item.toLowerCase())
        correctIngredients.forEach(ingredient => {
          if(ingredient.includes(item)){
            // unfoundIngredient.splice(index, 0, item)
            ingredients.push(ingredient)
          }
        })
      })
      // console.log("ingredient", ingredients)
      // console.log(unfoundIngredient)
      let newSet = new Set(data)
      let someData = Array.from(newSet)
      // console.log("someData", someData)
      // console.log("newData",newData)
      // console.log("data", data)

      this.setState({recipeIngredients: someData})
    }

    percentageMatchCalculator=()=>{
      console.log(this.state.recipeIngredients)
      APIManager.existingUsersSuggestedRecipes(this.state.recipeIngredients)
      .then(data => console.log(data))
    }



  render(){
    return(
      <React.Fragment>
        <p>Hi, this will be the recipe suggestion engine</p>
        <BuildSuggestions ingredients={this.state.recipeIngredients}/>
        {/* <div>{this.splitIngredients()}</div> */}
      </React.Fragment>
    )
  }
}