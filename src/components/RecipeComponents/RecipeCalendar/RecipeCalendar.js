import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import APIManager from '../../../modules/APIManager'
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import '../Recipe.css'
import {Card, Image} from 'semantic-ui-react'
import RecipeModal from '../RecipeModal/RecipeModal';



export default class RecipeCalendar extends Component{

  state ={
    localizer: BigCalendar.momentLocalizer(moment),
    viewRecipeDetails: false,
    getStarted: false,
    open: false,
    activeRecipeKey: "",
    date: "",
    recipeDetails: [],
    events: [],
  }

  // componentDidMount = () =>{
  //   this.updateData()
  // }

  // updateData=()=>{
  //   APIManager.getAllCategory("usersRecipes?_expand=user")
  //   .then((usersRecipes)=>{
  //     let recipeEvents = []
  //     usersRecipes.forEach(recipe => {
  //       if(recipe.userId === parseInt(sessionStorage.getItem("id"))){
  //         recipeEvents.push(APIManager.getRecipeDetails(recipe.recipeId)
  //           .then((recipeDetails)=> {
  //             let expandedRecipe = {
  //               id: recipe.recipeId,
  //               eventId: recipe.id,
  //               title: recipeDetails.name,
  //               allDay: true,
  //               start: recipe.date,
  //               end: recipe.date,
  //               recipeDetails: recipeDetails
  //             }
  //             return expandedRecipe
  //           })
  //         )
  //       } else{
  //         return
  //       }
  //     })
  //     return Promise.all(recipeEvents)
  //   })
  //   .then(data => {
  //     this.setState({
  //       events: data
  //     })
  //   })
  // }

  Event=({event})=>{
    return <Card key={event.id} className="">
      {/* <Image src={event.imageUrlsBySize[90]} /> */}
      <Card.Content>
        {/* <Card.Header>{event.title}</Card.Header> */}
        <Card.Description>{event.title}</Card.Description>
        <Card.Meta>{event.recipeDetails.source.sourceDisplayName}</Card.Meta>
      </Card.Content>
    </Card>
  }

  // showRecipeDetails=(event)=>{
  //   APIManager.getRecipeDetails(event.id)
  //   .then((response)=>
  //     this.setState({
  //       recipeDetails: response,
  //       date: event.start,
  //       activeRecipeKey: event.eventId,
  //       viewRecipeDetails: true,
  //       open: true,
  //     })
  //   )
  // }

  // closeRecipeDetails=()=>{
  //   this.setState({viewRecipeDetails: false, open: false})
  // }

  // handleCalendarChange=(id, date)=>{
  //   let updatedRecipe ={
  //     userId: parseInt(sessionStorage.getItem("id")),
  //     recipeId: id,
  //     date: date,
  //   }
  //   APIManager.updateItem("usersRecipes", this.state.activeRecipeKey, updatedRecipe)
  //   .then(()=> {
  //     this.updateData()
  //     this.closeRecipeDetails()
  //   })
  // }

  // deleteRecipe=()=>{
  //   APIManager.deleteItem("usersRecipes", this.state.activeRecipeKey)
  //   .then(()=>{
  //     this.updateData()
  //     this.closeRecipeDetails()
  //   })
  // }

  render(){
    // if(this.state.viewRecipeDetails === true){
    //   return <RecipeModal recipeDetails={this.state.recipeDetails} getStarted={this.state.getStarted} closeRecipeDetails={this.closeRecipeDetails} handleCalendarChange={this.handleCalendarChange} deleteRecipe={this.props.deleteRecipe} date={this.state.date} open={this.state.open}/>
    // }
    return(
      <React.Fragment>
        <BigCalendar
          defaultView ={BigCalendar.Views.WEEK}
          step ={360}
          localizer={this.state.localizer}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => this.props.showRecipeDetails(event, "calendar")}
          components={{
            event: this.Event,
          }}
        />
      </React.Fragment>
    )
  }

}