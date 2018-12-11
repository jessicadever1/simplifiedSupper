import React, {Component} from 'react'
import RecipeCalendar from '../RecipeComponents/RecipeCalendar/RecipeCalendar'
import {Grid, Header, Card, Placeholder} from 'semantic-ui-react'
import RecipeSuggestionEngine from '../RecipeComponents/RecipeSuggestionEngine/RecipeSuggestionEngine';
import '../RecipeComponents/Recipe.css'

export default class Home extends Component{

  render(){
    return(
      <React.Fragment>
        <div className="home">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.home{
              height: 100%
            }`}</style>
          <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
            <Grid.Row color="blue">
              <Grid.Column style={{maxWidth: 700}} color="violet">
                <Header as="h2" color="teal" textAlign="center">
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row color="orange">
              <Grid.Column style={{maxWidth: 700, height: '60vh'}} color="yellow" className="displayRecipes">
                <RecipeSuggestionEngine />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="bottom" style={{maxHeight: '80%'}} color="teal">
              <Grid.Column verticalAlign="bottom" style={{maxWidth: 800, height: '100%'}} color="pink" className="calendar">
                <RecipeCalendar activeUser={this.props.activeUser}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}