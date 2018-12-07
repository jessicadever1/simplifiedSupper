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
// import dates from '../../../node_modules/react-big-calendar/lib/utils/dates'
// import events from '../../../node_modules/react-big-calendar/lib/utils'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])


export default class RecipeCalendar extends Component{

  state ={
    localizer: BigCalendar.momentLocalizer(moment),
    events: [],
  }

  componentDidMount = () =>{
    APIManager.getAllCategory("usersRecipes?_expand=user")
    .then((usersRecipes)=>{
      let recipeEvents = []
      usersRecipes.forEach(recipe => {
        recipeEvents.push(APIManager.getRecipeDetails(recipe.recipeId)
        .then((recipeDetails)=> {
          let expandedRecipe ={
            title: recipeDetails.name,
            allDay: true,
            start: recipe.date,
            end: recipe.date,
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

  render(){
    return(
      <React.Fragment>
        <BigCalendar
          defaultView = 'week'
          step ={360}
          localizer={this.state.localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </React.Fragment>
    )
  }

}