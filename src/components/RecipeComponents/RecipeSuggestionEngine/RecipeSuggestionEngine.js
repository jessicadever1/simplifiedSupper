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
    matchedRecipes: [],
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
      let newSet = new Set(data)
      let someData = Array.from(newSet)
      this.setState({recipeIngredients: someData})
    }

    percentageMatchCalculator=()=>{
      let filteredRecipes = []
      let newFilter = []
      APIManager.getAllCategory("recipes")
      .then((recipes)=> {
        recipes.forEach(recipe=>{
          let counter = 0
          recipe.ingredients.forEach(ingredient =>{
            if(this.state.ingredients.includes(ingredient)){
              counter += 1
            }
          })
          let percentageMatch = (counter/recipe.ingredients.length)*100
          if(percentageMatch > 90){
            // if(filteredRecipes.find(recipeId => ))
            let newObj = Object.assign({}, recipe, {percentageMatch: percentageMatch })
            filteredRecipes.push(newObj)
          }
          })
        // console.log("filtered recipes",filteredRecipes)
        // let newData = new Set(filteredRecipes)
        // let test = Array.from(newData)
        // console.log(test.length)
        // newFilter.push(filteredRecipes[0])
        // filteredRecipes.forEach(recipe => {
        //   if(newFilter.includes(recipe.recipeId)){
        //     console.log("match")
        //   } else{
        //     newFilter.push(recipe)
        //     // console.log("no match")
        //   }
        // })
        // let newAray = filteredRecipes.filter(val => val.recipeId !== filteredRecipes.recipe.recipeId)
        // console.log(newAray.length)
        // filteredRecipes.forEach((recipe, index) =>{
        //   console.log("inside filtered recipes for each")
        //   newFilter.forEach(item =>{
        //     console.log("inside new filter for each")
        //     if(item.includes(recipe.id)){
        //       console.log("match found")
        //     } else{
        //       console.log("no match found")
        //     }
        //   })
          // if(!newFilter.includes(recipe.id)){
          //   newFilter.push(recipe)
          // }
        // })
        this.setState({matchedRecipes: filteredRecipes})
      })
    }

    ingredientAvailability = (key, value) => {
      this.setState(prevState => {
        //key is ingredient.id
        //value is true or false
        let obj = Object.assign({}, prevState.ingredientAvailability, {[key]: value})
        return {ingredientAvailability: obj}
      })
    }


  render(){
    return(
      <React.Fragment>
        <BuildSuggestions ingredients={this.state.recipeIngredients} matchedRecipes={this.state.matchedRecipes} showRecipeDetails={this.props.showRecipeDetails}/>
      </React.Fragment>
    )
  }
}