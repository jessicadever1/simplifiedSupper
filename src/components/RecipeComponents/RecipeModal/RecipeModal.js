import React, {Component} from 'react'
import {Modal, Header, Statistic, Image, Button, Input, Confirm, List} from 'semantic-ui-react'
import '../Recipe.css'
import moment from 'moment'

export default class RecipeModal extends Component{

  state={
    open: false,
    add_to_calendar: false,
    confirm_delete: false,
    date: "",
  }

  handle_button_click=()=>{
    this.setState({add_to_calendar: true})
  }

  handle_calendar_change=(name, value)=>{
    this.setState({ [name]: value})
  }

  confirm_delete=()=>{
    this.setState({confirm_delete: true})
  }

  cancel_delete=()=>{
    this.setState({confirm_delete: false})
  }

  make_buttons=(get_started)=>{
    if(get_started === true){
     return <React.Fragment>
        <Input
          type="date"
          className={`${this.state.add_to_calendar === false ? "isHidden" : ""}`}
          onChange={(evt)=> this.handle_calendar_change("date", moment(evt.target.value))}
          required/>
        <Button
          color="teal"
          className={`${this.state.add_to_calendar === true ? "isHidden" : ""}`}
          onClick={()=>this.handle_button_click()} content="Add to Calendar"/>
        <Button
          color="teal"
          className={`${this.state.add_to_calendar === false ? "isHidden" : ""}`}
          onClick={()=> this.props.handle_calendar_change("newRecipe", this.props.recipe_details.id, this.state.date)}
          content="Save Recipe"/>
      </React.Fragment>
    } else{
      return <React.Fragment>
        <Input
          type="date"
          defaultValue={moment(this.props.date).format("YYYY-MM-DD")}
          onChange={(evt)=> this.handle_calendar_change("date", moment(evt.target.value))}/>
        <Button
          color="teal"
          onClick={()=>this.props.handle_calendar_change( "existingRecipe",this.props.recipe_details.id, this.state.date)}
          content="Save Changes"/>
        <Button
          color="teal"
          onClick={()=>this.confirm_delete()} content="Delete Recipe"/>
      </React.Fragment>
    }
  }

  make_modal_stats=(recipe)=>{
    if(recipe.id === "leftovers" || recipe.id === "eatOut"){
      return
    } else{
      return <Statistic.Group size='mini' widths="three">
    <Statistic value={this.props.recipe_details.ingredientLines.length} label="Ingredients"/>
    <Statistic value={this.props.recipe_details.nutritionEstimates[0].value} label="Calories"/>
    <Statistic value={this.props.recipe_details.totalTime} label="Total Time"/>
  </Statistic.Group>
    }
  }

  make_ingredients_list=(recipe)=>{
    if(recipe.id === "leftovers" || recipe.id === "eatOut"){
      return
    } else{
      return <List>
      <Header as="h3" dividing content="Ingredients"/>
      {
        recipe.ingredientLines.map((ingredient, index)=>{
          return <List.Item key={index} content={ingredient}/>
          })
      }
    </List>
    }
  }

  make_instruction_button=(recipe)=>{
    if(recipe.id === "leftovers" || recipe.id === "eatOut"){
      return
    } else{
      return <a href={this.props.recipe_details.source.sourceRecipeUrl} target="_blank" rel="noopener noreferrer"><Button content="Read Instructions"/></a>
    }
  }

  render(){
    if(this.state.confirm_delete === true){
      return <Confirm open={this.state.confirm_delete} onCancel={this.cancel_delete} onConfirm={()=>this.props.delete_recipe()}/>
    }
    return(
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.close_recipe_details}>
          <Modal.Header content={this.props.recipe_details.name}/>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.recipe_details.images[0].hostedLargeUrl} />
            <Modal.Description>
                <div>
                  <a href={this.props.recipe_details.source.sourceRecipeUrl} target="_blank" rel="noopener noreferrer">
                  {this.props.recipe_details.source.sourceDisplayName}
                  </a>
                </div>
                {
                  this.makeModalStats(this.props.recipe_details)
                }
                {
                  this.makeIngredientsList(this.props.recipe_details)
                }
                {
                  this.makeInstructionButton(this.props.recipe_details)
                }
              {/* <div>
                <a href={this.props.recipeDetails.attribution.link} >{this.props.recipeDetails.attribution.text}</a>
                <img src={this.props.recipeDetails.attribution.logo} alt="Yummly Logo"/>
              </div> */}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.makeButtons(this.props.get_started)}
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}