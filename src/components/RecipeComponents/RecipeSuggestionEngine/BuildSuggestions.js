import React, {Component} from 'react'
import APIManager from '../../../modules/APIManager'
import {Image, Card} from 'semantic-ui-react'

export default class BuildSuggestions extends Component{
  state={
    ingredients: []
  }


  render(){
    return(
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
        {
          this.props.matchedRecipes.map((match, index)=>{
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
      </React.Fragment>
    )
  }
}