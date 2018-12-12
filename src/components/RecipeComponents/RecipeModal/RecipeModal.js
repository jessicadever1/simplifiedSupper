import React, {Component} from 'react'
import {Modal, Header, Statistic, Image, Button, Input, Confirm} from 'semantic-ui-react'
import '../Recipe.css'
import moment from 'moment'

export default class RecipeModal extends Component{

  state={
    open: false,
    addToCalendar: false,
    confirmDelete: false,
    date: "",
  }

  handleButtonClick=()=>{
    this.setState({addToCalendar: true})
  }

  handleCalendarChange=(name, value)=>{
    this.setState({ [name]: value})
  }

  confirmDelete=()=>{
    this.setState({confirmDelete: true})
  }

  cancelDelete=()=>{
    this.setState({confirmDelete: false})
  }

  makeButtons=(getStarted)=>{
    if(getStarted === true){
     return <React.Fragment>
        <Input type="date" className={`${this.state.addToCalendar === false ? "isHidden" : ""}`} onChange={(evt)=> this.handleCalendarChange("date", moment(evt.target.value))} required></Input>
        <Button primary className={`${this.state.addToCalendar === true ? "isHidden" : ""}`} onClick={()=>this.handleButtonClick()}>Add to Calendar</Button>
        <Button primary className={`${this.state.addToCalendar === false ? "isHidden" : ""}`} onClick={()=> this.props.handleCalendarChange("newRecipe", this.props.recipeDetails.id, this.state.date)}>Save Recipe</Button>
      </React.Fragment>
    } else{
      return <React.Fragment>
        <Input type="date" defaultValue={moment(this.props.date).format("YYYY-MM-DD")} onChange={(evt)=> this.handleCalendarChange("date", moment(evt.target.value))}></Input>
        <Button primary onClick={()=>this.props.handleCalendarChange( "existingRecipe",this.props.recipeDetails.id, this.state.date)}>Save Changes</Button>
        <Button primary onClick={()=>this.confirmDelete()}>Delete Recipe</Button>
      </React.Fragment>
    }
  }

  render(){
    if(this.state.confirmDelete === true){
      return <Confirm open={this.state.confirmDelete}onCancel={this.cancelDelete} onConfirm={()=>this.props.deleteRecipe()}></Confirm>
    }
    return(
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.closeRecipeDetails}>
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
                    <Statistic>
                      <Statistic.Value>{this.props.recipeDetails.nutritionEstimates[0].value}</Statistic.Value>
                      <Statistic.Label>Calories</Statistic.Label>
                    </Statistic>
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