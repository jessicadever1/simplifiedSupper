import React, {Component} from 'react'
import RecipeCalendar from '../recipeSuggestionEngine/RecipeCalendar'

export default class Home extends Component{

  render(){
    return(
      <React.Fragment>
        This is the home page!
        <RecipeCalendar />
      </React.Fragment>
    )
  }
}