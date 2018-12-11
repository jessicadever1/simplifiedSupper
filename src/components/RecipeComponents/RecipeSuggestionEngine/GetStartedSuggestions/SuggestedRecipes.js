import React, {Component} from 'react'
import {Grid, Card, Image, Header, Segment, Icon, Button} from 'semantic-ui-react'
import '../../../getstarted/GetStarted.css'
import APIManager from '../../../../modules/APIManager';
import RecipeModal from '../../RecipeModal/RecipeModal';
export default class SuggestedRecipes extends Component{
  state={
    showRecipe: false,
    getStarted: true,
    open: false,
    recipeDetails: []
  }

  seeRecipeDetails=(id)=>{
    APIManager.getRecipeDetails(id)
    .then((response)=>
    this.setState({
      recipeDetails: response,
      showRecipe: true,
      open: true,
    })
    )
  }

  closeRecipeDetails=()=>{
    this.setState({showRecipe: false, open: false})
  }

  render(){
    let showRecpie = ""
    if(this.state.showRecipe === true){
      showRecpie = <RecipeModal getStarted={this.state.getStarted}
      handleCalendarChange={this.props.handleCalendarChange} closeRecipeDetails={this.closeRecipeDetails} recipeDetails={this.state.recipeDetails} open={this.state.open}/>
    } else if(this.props.matches.length === 0){
      return <Segment>
        <Header>
          <Icon name="thumbs down icon"/>
          Bummer, we dont have any recipes suggestions for {this.props.category} {this.props.dish}
        </Header>
        <Button id="startOver" primary onClick={this.props.handleButtonClick}>Try Again</Button>
      </Segment>
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
                    return <Card key={index} onClick={()=>this.seeRecipeDetails(match, "getStarted")}>
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