import React, {Component} from 'react'
import {Grid, Card, Header, Segment, Icon, Button} from 'semantic-ui-react'
import '../../../getstarted/GetStarted.css'
import RecipeModal from '../../RecipeModal/RecipeModal';
export default class SuggestedRecipes extends Component{

  render(){
    let show_recpie = ""
    if(this.props.show_recipe === true){
      show_recpie = <RecipeModal get_started={this.props.get_started}
      handle_calendar_change={this.props.handle_calendar_change} close_recipe_details={this.props.close_recipe_details} recipe_details={this.props.recipe_details} open={this.props.open} active_recipe_key={this.props.active_recipe_key}/>
    } else if(this.props.matches.length === 0){
      return <Segment>
        <Header>
          <Icon name="thumbs down icon"/>
          Bummer, we dont have any recipes suggestions for {this.props.category} {this.props.dish}
        </Header>
        <Button id="startOver" primary onClick={this.props.handle_button_click} content="Try Again"/>
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
                    onClick={()=>this.props.see_recipe_details( match.recipe_Id, match.id)}
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
        {show_recpie}
      </React.Fragment>
    )
  }
}