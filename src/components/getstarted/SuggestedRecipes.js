import React, {Component} from 'react'
import {Placeholder, Grid, Segment, Card, Image, Header} from 'semantic-ui-react'
import './GetStarted.css'

export default class SuggestedRecipes extends Component{

  render(){
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
                  this.props.matches.map((match, index) => {
                    return <Card key={index}>
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
      </React.Fragment>
    )
  }
}