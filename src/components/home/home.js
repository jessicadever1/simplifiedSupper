import React, {Component} from 'react'
import RecipeCalendar from '../recipeSuggestionEngine/RecipeCalendar'
import {Grid, Header, Card, Placeholder} from 'semantic-ui-react'
import RecipeSuggestionEngine from '../recipeSuggestionEngine/RecipeSuggestionEngine';

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
                  This is the home page!
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row color="orange">
              <Grid.Column style={{maxWidth: 700}} color="yellow">
                <RecipeSuggestionEngine />
                <Card.Group itemsPerRow={3}>
                  <Card>
                    <Card.Content>
                      <Placeholder>
                        <Placeholder.Image square/>
                      </Placeholder>
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Placeholder>
                        <Placeholder.Image square />
                      </Placeholder>
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Placeholder>
                        <Placeholder.Image square />
                      </Placeholder>
                    </Card.Content>
                  </Card>
                </Card.Group>
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