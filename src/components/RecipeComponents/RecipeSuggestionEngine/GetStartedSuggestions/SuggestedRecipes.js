import React, {Component} from 'react'
import {Grid, Card, Header, Segment, Icon, Button} from 'semantic-ui-react'
import '../../../getstarted/GetStarted.css'
import RecipeModal from '../../RecipeModal/RecipeModal';
export default class SuggestedRecipes extends Component{

  render(){
    let showRecpie = ""
    if(this.props.showRecipe === true){
      showRecpie = <RecipeModal getStarted={this.props.getStarted}
      handleCalendarChange={this.props.handleCalendarChange} closeRecipeDetails={this.props.closeRecipeDetails} recipeDetails={this.props.recipeDetails} open={this.props.open} activeRecipeKey={this.props.activeRecipeKey}/>
    } else if(this.props.matches.length === 0){
      return <Segment>
        <Header>
          <Icon name="thumbs down icon"/>
          Bummer, we dont have any recipes suggestions for {this.props.category} {this.props.dish}
        </Header>
        <Button id="startOver" primary onClick={this.props.handleButtonClick} content="Try Again"/>
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
        <Grid textAlign="center" style={{ height:'100%'}}>
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '10vh'}}>
              <Header as="h1" color="teal" textAlign="center" content="How About One of These?"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{maxHeight: '60%'}}>
            <Grid.Column style={{maxWidth: '80vw', height: '85vh'}} className="displayRecipes">
              <Card.Group itemsPerRow={6}>
                {
                  this.props.matches.map((match, index) => {
                    return <Card
                    key={index}
                    onClick={()=>this.props.seeRecipeDetails( match.recipe_Id, match.id)}
                    image={match.imageUrlsBySize[90]}
                    header={match.recipeName}
                    meta={match.sourceDisplayName}
                    />
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