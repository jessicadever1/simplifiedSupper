import React, {Component} from 'react'
import {Image, Card, Statistic} from 'semantic-ui-react'
import '../../RecipeComponents/Recipe.css'

export default class BuildSuggestions extends Component{
  state={
    ingredients: [],
    showRecipe: false,
    getStarted: true,
    open: false,
    recipeDetails: []
  }

  createCardColor=(recipe)=>{
    if(recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
      return
    } else if(recipe.percentageMatch < 50){
        return "red"
    } else if(recipe.percentageMatch >= 75){
      return "green"
    } else{
      return "yellow"
    }
  }

  createCardStat = (recipe)=>{
    if(recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
      return
    } else{
      return <Statistic horizontal color={this.createCardColor(recipe)} value={Math.floor(recipe.percentageMatch)} label="Match"/>
    }
  }


  render(){
    this.props.matchedRecipes.sort(function(a,b){
      return b.percentageMatch-a.percentageMatch
    })
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
        {
          this.props.matchedRecipes.map((match, index)=>{
            return <Card
            key={index}
            color={this.createCardColor(match)}
            onClick={()=> this.props.showRecipeDetails(match, "suggestionEngine")}>
              <Card.Content>
                <Image src={match.imageUrlsBySize[90]} />
                <Card.Header content={match.recipeName} />
                <Card.Meta content={match.sourceDisplayName} />
                <Card.Content extra>
                {this.createCardStat(match)}
                </Card.Content>
              </Card.Content>
            </Card>
          })
        }
        </Card.Group>
      </React.Fragment>
    )
  }
}