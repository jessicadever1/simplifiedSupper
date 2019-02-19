import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import '../Recipe.css'
import {Card} from 'semantic-ui-react'

export default class RecipeCalendar extends Component{

  state ={
    localizer: BigCalendar.momentLocalizer(moment),
  }

  Event=({event})=>{
    return <Card
            key={event.id}
            className=""
            image={event.recipe_details.imageUrlsBySize[90]}
            header={event.title}
            meta={event.recipe_details.sourceDisplayName}/>
  }

  render(){
    return(
      <React.Fragment>
        <BigCalendar
          defaultView ={BigCalendar.Views.WEEK}
          step ={360}
          localizer={this.state.localizer}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => this.props.show_recipe_details(event, "calendar")}
          components={{
            event: this.Event,
          }}
        />
      </React.Fragment>
    )
  }

}