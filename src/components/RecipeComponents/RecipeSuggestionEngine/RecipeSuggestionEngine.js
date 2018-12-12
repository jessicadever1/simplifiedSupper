import React, {Component} from 'react'
import {Image, Card} from 'semantic-ui-react'

export default class BuildSuggestions extends Component{
  state={
    ingredients: [],
    showRecipe: false,
    getStarted: true,
    open: false,
    recipeDetails: []
  }

  //TODO: Update percentage match to appear in the color code assigned below, bold font
  //TODO: Sort cards from highest to lowest percentage match

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
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
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
              <Card.Description color={this.createCardColor(match)}>{Math.floor(match.percentageMatch)}% Match</Card.Description>
            </Card.Content>
            </Card>
          })
        }
        </Card.Group>
      </React.Fragment>
    )
  }
}