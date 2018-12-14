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
    } else if(recipe.percentageMatch >= 75){
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
        <Card.Group itemsPerRow={7}>
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
                  <Statistic horizontal color={this.createCardColor(match)} value={Math.floor(match.percentageMatch)} label="Match"/>
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