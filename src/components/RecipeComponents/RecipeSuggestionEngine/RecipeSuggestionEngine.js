import React, {Component} from 'react'
import {Image, Card, Statistic} from 'semantic-ui-react'
import '../../RecipeComponents/Recipe.css'

export default class BuildSuggestions extends Component{
  state={
    ingredients: [],
    show_recipe: false,
    get_started: true,
    open: false,
    recipe_details: []
  }

  create_card_color=(recipe)=>{
    if(recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
      return
    } else if(recipe.percentage_match < 50){
        return "red"
    } else if(recipe.percentage_match >= 75){
      return "green"
    } else{
      return "yellow"
    }
  }

  createCardStat = (recipe)=>{
    if(recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
      return
    } else{
      return <Statistic horizontal color={this.create_card_color(recipe)} value={Math.floor(recipe.percentage_match)} label="Match"/>
    }
  }


  render(){
    this.props.matched_recipes.sort(function(a,b){
      return b.percentage_match-a.percentage_match
    })
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={6}>
        {
          this.props.matched_recipes.map((match, index)=>{
            return <Card
            key={index}
            color={this.create_card_color(match)}
            onClick={()=> this.props.show_recipe_details(match, "suggestionEngine")}>
              <Card.Content>
                <Image src={match.imageUrlsBySize[90]} />
                <Card.Header content={match.recipeName} />
                <Card.Meta content={match.sourceDisplayName} />
                <Card.Content extra>
                {this.create_card_stat(match)}
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