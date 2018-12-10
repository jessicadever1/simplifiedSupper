import React, {Component} from 'react'
import APIManager from '../../../modules/APIManager'

export default class BuildSuggestions extends Component{
  state={
    ingredients: []
  }

  componentDidMount=()=>{
    // this.setState({ingredients: this.props.ingredients})
    // this.percentageMatchCalculator(this.props.ingredients)
  }
  percentageMatchCalculator=(ingredients)=>{
    console.log(ingredients)
    APIManager.existingUsersSuggestedRecipes(this.state.ingredients)
    // .then(recipes => {
      // console.log("recipes", recipes)
  //     recipes.matches.forEach(recipe =>{
  //       let matchedIngredients = []
  //       recipe.ingredients.forEach(ingredient =>{
  //         if(ingredient.includes(this.props.ingredients)){
  //           matchedIngredients.push(ingredient)
  //         }
        // })
  //       console.log("matchedIngredients", matchedIngredients.length, matchedIngredients, "total ingredients", recipe.ingredients.length)
  //     })
  //   })
  }


  render(){
    return(
      <div>Hi, I'm the suggestion component</div>
    )
  }
}