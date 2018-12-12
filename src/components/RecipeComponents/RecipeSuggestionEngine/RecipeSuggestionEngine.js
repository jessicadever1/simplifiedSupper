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
      if(recipe.percentageMatch < 50){
        return "red"
    } else if(recipe.percentageMatch >= 80){
      return "green"
    }else{
      return "yellow"
    }
  }


  render(){
    this.props.matchedRecipes.sort(function(a,b){
      return b.percentageMatch-a.percentageMatch
    })
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={5}>
        {
          this.props.matchedRecipes.map((match, index)=>{
            return <Card
            key={index}
            color={this.createCardColor(match)}
            onClick={()=> this.props.showRecipeDetails(match, "suggestionEngine")}
            >
            <Image src={match.imageUrlsBySize[90]} />
            <Card.Content>
              <Card.Header>{match.recipeName}</Card.Header>
              <Card.Meta>{match.sourceDisplayName}</Card.Meta>
              <Card.Content extra>
                <Statistic horizontal color={this.createCardColor(match)} size='mini'>
                  <Statistic.Value>{Math.floor(match.percentageMatch)}%</Statistic.Value>
                  <Statistic.Label>Match</Statistic.Label>
                </Statistic>
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