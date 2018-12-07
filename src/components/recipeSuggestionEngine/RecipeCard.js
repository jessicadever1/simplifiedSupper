/*
Given a user is reviewing recipes through either the recipe suggestion or directly in their calendar
When the user clicks on the preview of the recipe
Then the user should be presented with the full recipe details
And be offered the affordance to add the recipe to a specific day
And edit the date the recipe is assigned to
*/

import React, {Component} from 'react'
import {Modal, Header, Statistic, Image, Button, Input} from 'semantic-ui-react'
import './Recipe.css'


//FIXME: Close Icon on Modal does not work
//FIXME: Add Instructions to app

export default class RecipeCard extends Component{

  state={
    addToCalendar: false,
    date: "",
  }

  handleButtonClick=()=>{
    this.setState({addToCalendar: true})
  }

  handleCalendarChange=(name, value)=>{
    this.setState({ [name]: value})
  }

  makeButtons=(getStarted)=>{
    if(getStarted === true){
     return <React.Fragment>
        <Input type="date" className={`${this.state.addToCalendar === false ? "isHidden" : ""}`} onChange={(evt)=>this.props.handleCalendarChange(evt, this.props.recipeDetails.id)}></Input>
        <Button primary onClick={()=>this.handleButtonClick()}>Add to Calendar</Button>
      </React.Fragment>
    } else{
      return <React.Fragment>
        <Input type="date" onChange={(evt)=> this.handleCalendarChange("date", evt.target.value)}></Input>
        <Button primary onClick={()=>this.props.handleCalendarChange( this.props.recipeDetails.id, this.state.date)}>Save Changes</Button>
      </React.Fragment>
    }
  }

  render(){
    return(
      <React.Fragment>
        <Modal open closeIcon>
          <Modal.Header>

          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.recipeDetails.images[0].hostedLargeUrl} />
            <Modal.Description>
                <Header>{this.props.recipeDetails.name}</Header>
                <div>
                  <a href={this.props.recipeDetails.source.sourceRecipeUrl} target="_blank" rel="noopener noreferrer">
                  {this.props.recipeDetails.source.sourceDisplayName}
                  </a>
                </div>
                <div>
                  <Statistic.Group size='mini' widths="three">
                    <Statistic>
                      <Statistic.Value>{this.props.recipeDetails.ingredientLines.length}</Statistic.Value>
                      <Statistic.Label>Ingredients</Statistic.Label>
                    </Statistic>
                      {
                        this.props.recipeDetails.nutritionEstimates.map(item =>{
                          if(item.attribute === "FAT_KCAL"){
                            return<Statistic key={item.id}>
                            <Statistic.Value>{item.value}</Statistic.Value>
                            <Statistic.Label>Calories</Statistic.Label>
                            </Statistic>
                          } else{
                            return
                          }
                        })
                      }
                    <Statistic>
                      <Statistic.Value>
                      {this.props.recipeDetails.totalTime}
                      </Statistic.Value>
                      <Statistic.Label>Total Time</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </div>
                <div>Ingredients List</div>
                <ul>
                  {
                    this.props.recipeDetails.ingredientLines.map((ingredient, index) =>{
                      return <li key={index}>{ingredient}</li>
                    })
                  }
                </ul>
                <div>Instructions</div>
                <ol>
                  <li>Step 1</li>
                  <li>Step 2</li>
                  <li>Step 3</li>
                </ol>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.makeButtons(this.props.getStarted)}
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}