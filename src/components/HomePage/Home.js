import React, {Component} from 'react'
import RecipeCalendar from '../RecipeComponents/RecipeCalendar/RecipeCalendar'
import {Grid, Header, Card, Placeholder, Button} from 'semantic-ui-react'
import RecipeSuggestionEngine from '../RecipeComponents/RecipeSuggestionEngine/RecipeSuggestionEngine';
import '../RecipeComponents/Recipe.css'
import APIManager from '../../modules/APIManager'
import RecipeModal from '../RecipeComponents/RecipeModal/RecipeModal'
import moment from 'moment'
import FilterRecipes from '../RecipeComponents/RecipeSuggestionEngine/FilterRecipes';

export default class Home extends Component{
  state={
    viewRecipeDetails: false,
    getStarted: false,
    open: false,
    activeRecipeKey: "",
    date: "",
    visible: false,
    recipeDetails: [],
    events: [],
    cuisines: [],
    courses: []
  }

  componentDidMount=()=>{
    this.updateData()
  }

  updateData=()=>{
    APIManager.getAllCategory("usersRecipes?_expand=user")
    .then((usersRecipes)=>{
      let recipeEvents = []
      usersRecipes.forEach(recipe => {
        if(recipe.userId === parseInt(sessionStorage.getItem("id"))){
          recipeEvents.push(APIManager.getRecipeDetails(recipe.recipeId)
            .then((recipeDetails)=> {
              let expandedRecipe = {
                id: recipe.recipeId,
                eventId: recipe.id,
                title: recipeDetails.name,
                allDay: true,
                start: recipe.date,
                end: recipe.date,
                recipeDetails: recipeDetails
              }
              return expandedRecipe
            })
          )
        } else{
          return
        }
      })
      return Promise.all(recipeEvents)
    })
    .then(data => {
      this.setState({
        events: data
      })
    })
    .then(()=> APIManager.getAllCategory("cuisines"))
    .then((response)=> this.setState({cuisines: response}))
    .then(()=> APIManager.getAllCategory("courses"))
    .then((response)=> this.setState({courses: response}))
  }

  showRecipeDetails=(details, key)=>{
    console.log(details, key)
    if(key === "calendar"){
      // console.log(details)
      APIManager.getRecipeDetails(details.id)
      .then((response)=>{
        this.setState({
          recipeDetails: response,
          date: moment(details.start).format("YYYY-MM-DD"),
          activeRecipeKey: details.eventId,
          viewRecipeDetails: true,
          open: true,
        })
      })
    }
     else if(key === "suggestionEngine"){
      APIManager.getRecipeDetails(details.recipeId)
      .then((response)=>{
        this.setState({
          recipeDetails: response,
          activeRecipeKey: details.id,
          viewRecipeDetails: true,
          open: true,
          getStarted: true,
        })
      })
    }
  }

  closeRecipeDetails=()=>{
    this.setState({viewRecipeDetails: false, open: false, getStarted: false})
  }

  deleteRecipe=()=>{
    APIManager.deleteItem("usersRecipes", this.state.activeRecipeKey)
    .then(()=>{
      this.updateData()
      this.closeRecipeDetails()
    })
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

  handleSidebarClick=()=>{
    console.log("you want to filter")
    this.setState({visible: true})
  }

  render(){
    if(this.state.viewRecipeDetails === true){
      return <RecipeModal recipeDetails={this.state.recipeDetails} getStarted={this.state.getStarted} closeRecipeDetails={this.closeRecipeDetails} handleCalendarChange={this.handleCalendarChange} deleteRecipe={this.deleteRecipe} date={this.state.date} open={this.state.open} />
    }
    return(
      <React.Fragment>
        <div className="home">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.home{
              height: 100%
            }`}</style>
          <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
            <Grid.Row color="blue">
              <Grid.Column style={{maxWidth: 700}} color="violet">
                <Header as="h2" color="teal" textAlign="center">
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row color="orange">
              <Grid.Column style={{maxWidth: 700, height: '60vh'}} color="grey" className="displayRecipes">
                <Button onClick={()=>this.handleSidebarClick()}>Filter Recipes</Button>

                {/* <FilterRecipes visbile={this.state.visible} */}
                {/* cuisines={this.state.cuisines} courses={this.state.courses} */}
                {/* /> */}
                <RecipeSuggestionEngine showRecipeDetails={this.showRecipeDetails} closeRecipeDetails={this.closeRecipeDetails}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="bottom" style={{maxHeight: '80%'}} color="teal">
              <Grid.Column verticalAlign="bottom" style={{maxWidth: 800, height: '100%'}} color="pink" className="calendar">
                <RecipeCalendar activeUser={this.props.activeUser} events= {this.state.events} showRecipeDetails={this.showRecipeDetails} closeRecipeDetails={this.closeRecipeDetails}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}