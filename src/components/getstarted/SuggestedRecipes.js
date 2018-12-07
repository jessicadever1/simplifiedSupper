import React, {Component} from 'react'
import {Placeholder, Grid, Segment, Card, Image, Header} from 'semantic-ui-react'
import './GetStarted.css'
import APIManager from '../../modules/APIManager';
import RecipeCard from '../recipeSuggestionEngine/RecipeCard';

//TODO: If there is a query with no response, default to no response details and redirect to the beginning of query.
export default class SuggestedRecipes extends Component{
  state={
    showRecipe: false,
    recipeDetails: []
  }

  seeRecipeDetails=(id)=>{
    APIManager.getRecipeDetails(id)
    .then((response)=>
    this.setState({
      recipeDetails: response,
      showRecipe: true,
    })
    )
  }

  closeRecipeDetails=()=>{
    this.setState({showRecipe: false})
  }

  render(){
    let showRecpie = ""
    if(this.state.showRecipe === true){
      showRecpie = <RecipeCard handleCalendarChange={this.props.handleCalendarChange} closeRecipeDetails={this.closeRecipeDetails} recipeDetails={this.state.recipeDetails}/>
    }
    return(
      <React.Fragment>
        <div className="suggested-recipes">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.suggested-recipes{
              height: 100%
            }`}</style>
          <Grid textAlign="center" style={{ maxHeight: '80%', width: '80%' }} verticalAlign="top" centered>
              <Grid.Row color="blue">
                <Grid.Column style={{maxWidth: 700}} color="violet">
                  <Header as="h2" color="teal" textAlign="center">
                    How About One of These?
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row verticalAlign="bottom" style={{maxHeight: '60%'}} color="teal">
                <Grid.Column verticalAlign="bottom" style={{maxWidth: 700, height: '100%'}} color="pink" className="displayRecipes">
              <Card.Group itemsPerRow={4}>
                {
                  this.props.matches.matches.map((match, index) => {
                    return <Card key={index} onClick={()=>this.seeRecipeDetails(match.id)}>
                      <Image src={match.imageUrlsBySize[90]} />
                      <Card.Content>
                        <Card.Header>{match.recipeName}</Card.Header>
                        <Card.Meta>{match.sourceDisplayName}</Card.Meta>
                        <Card.Description></Card.Description>
                      </Card.Content>
                    </Card>
                  })
                }

              </Card.Group>
                </Grid.Column>
              </Grid.Row>
          </Grid>
        </div>
        {showRecpie}
      </React.Fragment>
    )
  }
}