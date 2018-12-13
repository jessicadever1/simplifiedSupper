import React, {Component} from 'react'
import {Modal, Header, Statistic, Image, Button, Input, Confirm, List} from 'semantic-ui-react'
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
        <Input
          type="date"
          className={`${this.state.addToCalendar === false ? "isHidden" : ""}`}
          onChange={(evt)=> this.handleCalendarChange("date", moment(evt.target.value))}
          required/>
        <Button
          primary
          className={`${this.state.addToCalendar === true ? "isHidden" : ""}`}
          onClick={()=>this.handleButtonClick()} content="Add to Calendar"/>
        <Button
          primary
          className={`${this.state.addToCalendar === false ? "isHidden" : ""}`}
          onClick={()=> this.props.handleCalendarChange("newRecipe", this.props.recipeDetails.id, this.state.date)}
          content="Save Recipe"/>
      </React.Fragment>
    } else{
      return <React.Fragment>
        <Input
          type="date"
          defaultValue={moment(this.props.date).format("YYYY-MM-DD")}
          onChange={(evt)=> this.handleCalendarChange("date", moment(evt.target.value))}/>
        <Button
          primary
          onClick={()=>this.props.handleCalendarChange( "existingRecipe",this.props.recipeDetails.id, this.state.date)}
          content="Save Changes"/>
        <Button
          primary
          onClick={()=>this.confirmDelete()} content="Delete Recipe"/>
      </React.Fragment>
    }
  }

  render(){
    if(this.state.confirmDelete === true){
      return <Confirm open={this.state.confirmDelete}onCancel={this.cancelDelete} onConfirm={()=>this.props.deleteRecipe()}/>
    }
    return(
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.closeRecipeDetails}>
          <Modal.Header content={this.props.recipeDetails.name}/>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.recipeDetails.images[0].hostedLargeUrl} />
            <Modal.Description>
                <div>
                  <a href={this.props.recipeDetails.source.sourceRecipeUrl} target="_blank" rel="noopener noreferrer">
                  {this.props.recipeDetails.source.sourceDisplayName}
                  </a>
                </div>
              <Statistic.Group size='mini' widths="three">
                <Statistic value={this.props.recipeDetails.ingredientLines.length} label="Ingredients"/>
                <Statistic value={this.props.recipeDetails.nutritionEstimates[0].value} label="Calories"/>
                <Statistic value={this.props.recipeDetails.totalTime} label="Total Time"/>
              </Statistic.Group>
              <List>
                <Header as="h3" dividing content="Ingredients"/>
                {
                  this.props.recipeDetails.ingredientLines.map((ingredient, index)=>{
                    return <List.Item key={index} content={ingredient}/>
                    })
                  }
              </List>
              <a href={this.props.recipeDetails.source.sourceRecipeUrl} target="_blank" rel="noopener noreferrer"><Button content="Read Instructions"/></a>
              <div>
                <a href={this.props.recipeDetails.attribution.link} >{this.props.recipeDetails.attribution.text}</a>
                <img src={this.props.recipeDetails.attribution.logo} alt="Yummly Logo"/>
              </div>
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