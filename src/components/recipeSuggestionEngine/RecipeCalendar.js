/*
Given an active user is logged into their account and is currently viewing a recipe through the recipe suggestion engine (See #3 #6 #7 )
When the user selects a recipe to view full details
Then the user will be presented with the option to add the recipe to their calendar using a drop down field
When the date is selected and the user closes the recipe
Then they will see the new recipe card added to their calendar on the date they selected
*/

import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import APIManager from '../../modules/APIManager'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import './Recipe.css'
import {Card, Image} from 'semantic-ui-react'
import RecipeCard from './RecipeCard';
// import dates from '../../../node_modules/react-big-calendar/lib/utils/dates'
// import events from '../../../node_modules/react-big-calendar/lib/utils'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

//FIXME: Everything is showing up on the calendar 1 day behind when it is actually scheduled




export default class RecipeCalendar extends Component{

  state ={
    localizer: BigCalendar.momentLocalizer(moment),
    viewRecipeDetails: false,
    getStarted: false,
    activeRecipeKey: "",
    recipeDetails: [],
    events: [],
  }

  componentDidMount = () =>{
    this.updateData()
  }

  updateData=()=>{
    APIManager.getAllCategory("usersRecipes?_expand=user")
    .then((usersRecipes)=>{
      let recipeEvents = []
      usersRecipes.forEach(recipe => {
        recipeEvents.push(APIManager.getRecipeDetails(recipe.recipeId)
        .then((recipeDetails)=> {
          let expandedRecipe ={
            id: recipe.recipeId,
            eventId: recipe.id,
            title: recipeDetails.name,
            allDay: true,
            start: recipe.date,
            end: recipe.date,
            recipeDetails: recipeDetails
          }
          return expandedRecipe
        } ))
      })
      return Promise.all(recipeEvents)
    }).then((data)=> {
      this.setState({
        events: data,
      })
    })
  }

  Event=({event})=>{
    return <Card key={event.id}>
      {/* <Image src={event.imageUrlsBySize[90]} /> */}
      <Card.Content>
        {/* <Card.Header>{event.title}</Card.Header> */}
        <Card.Description>{event.title}</Card.Description>
        <Card.Meta>{event.recipeDetails.source.sourceDisplayName}</Card.Meta>
      </Card.Content>
    </Card>
  }

  showRecipeDetails=(event)=>{
    console.log(event)
    APIManager.getRecipeDetails(event.id)
    .then((response)=>
      this.setState({
        recipeDetails: response,
        activeRecipeKey: event.eventId,
        viewRecipeDetails: true,
      })
    )
  }

  closeRecipeDetails=()=>{
    this.setState({viewRecipeDetails: false})
  }

  handleCalendarChange=(id, date)=>{
    let updatedRecipe ={
      userId: parseInt(sessionStorage.getItem("id")),
      recipeId: id,
      date: date,
    }
    APIManager.updateItem("usersRecipes", this.state.activeRecipeKey, updatedRecipe)
    .then(()=> {
      this.updateData()
      this.closeRecipeDetails()
    })
  }

  render(){
    if(this.state.viewRecipeDetails === true){
      return <RecipeCard recipeDetails={this.state.recipeDetails} getStarted={this.state.getStarted} closeRecipeDetails={this.closeRecipeDetails} handleCalendarChange={this.handleCalendarChange}/>
    }
    return(
      <React.Fragment>
        <BigCalendar
          defaultView ={BigCalendar.Views.WEEK}
          step ={360}
          localizer={this.state.localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(evt, key) => this.showRecipeDetails(evt, key)}
          components={{
            event: this.Event,
          }}
        />
      </React.Fragment>
    )
  }

}