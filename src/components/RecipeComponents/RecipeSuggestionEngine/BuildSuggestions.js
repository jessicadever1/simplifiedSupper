import React, {Component} from 'react'
import APIManager from '../../../modules/APIManager'
import {Image, Card} from 'semantic-ui-react'
import moment from 'moment'
import RecipeModal from '../RecipeModal/RecipeModal'

export default class BuildSuggestions extends Component{
  state={
    ingredients: [],
    showRecipe: false,
    getStarted: true,
    open: false,
    recipeDetails: []
  }

  createCardColor=(recipe)=>{
      if(recipe.percentageMatch < 80){
        return "red"
    } else if(recipe.percentageMatch >= 90){
      return "green"
    }else{
      return "yellow"
    }
  }

  // seeRecipeDetails=(id)=>{
  //   APIManager.getRecipeDetails(id)
  //   .then((response)=>{
  //     this.setState({
  //       recipeDetails: response,
  //       showRecipe: true,
  //       open: true
  //     })
  //   })
  // }

  // closeRecipeDetails=()=>{
  //   this.setState({showRecipe: false, open: false})
  // }

  // handleCalendarChange=(evt, id)=>{
  //   let newRecipe ={
  //     userId: parseInt(sessionStorage.getItem("id")),
  //     recipeId: id,
  //     date: moment(evt.target.value)
  //   }
  //   APIManager.saveItem("usersRecipes", newRecipe)
  //   .then(()=> this.closeRecipeDetails())
  // }


  render(){
    // if(this.state.showRecipe === true){
    //  return <RecipeModal getStarted={this.state.getStarted} handleCalendarChange={this.handleCalendarChange} closeRecipeDetails={this.closeRecipeDetails} recipeDetails={this.state.recipeDetails} open={this.state.open} />
    // }
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
        {
          this.props.matchedRecipes.map((match, index)=>{
            return <Card key={index} color={this.createCardColor(match)} onClick={()=> this.props.showRecipeDetails(match, "suggestionEngine")}>
            <Image src={match.imageUrlsBySize[90]} />
            <Card.Content>
              <Card.Header>{match.recipeName}</Card.Header>
              <Card.Meta>{match.sourceDisplayName}</Card.Meta>
              <Card.Description color={this.createCardColor(match)}>{match.percentageMatch}% Match</Card.Description>
            </Card.Content>
            </Card>
          })
        }
        </Card.Group>
      </React.Fragment>
    )
  }
}