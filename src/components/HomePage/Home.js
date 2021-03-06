import React, {Component} from 'react'
import RecipeCalendar from '../RecipeComponents/RecipeCalendar/RecipeCalendar'
import {Grid, Header} from 'semantic-ui-react'
import RecipeSuggestionEngine from '../RecipeComponents/RecipeSuggestionEngine/RecipeSuggestionEngine';
import '../RecipeComponents/Recipe.css'
import APIManager from '../../modules/APIManager'
import RecipeModal from '../RecipeComponents/RecipeModal/RecipeModal'
import moment from 'moment'
import FilterRecipes from '../RecipeComponents/RecipeSuggestionEngine/FilterRecipes';


//Current status note: Filter functionality is working for cuisine and course, still need to add for eatout/leftover, add additional functionality for dietary restrictions and allergies and flavor profiles
export default class Home extends Component{
  state={
    viewRecipeDetails: false,
    getStarted: false,
    open: false,
    activeRecipeKey: "",
    date: "",
    recipe_Id: "",
    visible: false,
    recipeDetails: [],
    events: [],
    cuisines: [],
    courses: [],
    ingredients: [],
    matchedRecipes: [],
    allMatchedRecipes: [],
    filterCriteria: [],
  }

  componentDidMount=()=>{
    this.updateData()
  }

  updateData=()=>{
    APIManager.getAllCategory("usersRecipes")
    .then((usersRecipes)=>{
      let recipeEvents = []
      usersRecipes.forEach(recipe => {
        if(recipe.user_Id === parseInt(sessionStorage.getItem("id"))){
          recipeEvents.push(APIManager.getOneFromCategory("recipes", recipe.recipe_Num)
          .then((response)=> {
            let expandedRecipe = {
              id: recipe.recipe_Id,
              eventId: recipe.id,
              title: response.recipeName,
              allDay: true,
              start: recipe.date,
              end: recipe.date,
              recipeDetails: response
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
    .then(data =>{
      this.setState({
        events:data
      })
    })
    .then(()=> APIManager.getAllCategory("cuisines"))
    .then((response)=> this.setState({cuisines: response}))
    .then(()=> APIManager.getAllCategory("courses"))
    .then((response)=> this.setState({courses: response}))
    .then(()=> this.createIngredientList())
  }

  createIngredientList=()=>{
    let selectedIngredients = []
    let thisWeek = moment().week()
    this.state.events.forEach(event =>{
      //Check to see if recipe is scheduled for this week
      if(moment(event.start).week() === thisWeek){
        event.recipeDetails.ingredients.forEach(ingredient =>{
          //Check to see if ingredient already exists in array
          if(selectedIngredients.length === 0 && ingredient !== " "){
            selectedIngredients.push(ingredient)
          } else if(ingredient !== " "){
            if(!selectedIngredients.includes(ingredient)){
              selectedIngredients.push(ingredient)
            }
          }
        })
      }
    })
    this.setState({ingredients: selectedIngredients})
    this.percentageMatchCalculator()
  }

  percentageMatchCalculator=()=>{
    let scheduledRecipes = []
    let thisWeek = moment().week()
    let filteredRecipes = []
    this.state.events.forEach(event =>{
      if(moment(event.start).week() === thisWeek){
        scheduledRecipes.push(event.recipeDetails.id)
      }
    })
    APIManager.getAllCategory("recipes")
    .then((recipes)=>{
      recipes.forEach(recipe =>{
        //Remove the recipes that are already scheduled for the week
        if(!scheduledRecipes.includes(recipe.id)){
          let counter = 0
          recipe.ingredients.forEach(ingredient =>{
            if(this.state.ingredients.includes(ingredient)){
              counter +=1
            }
          })
          let percentageMatch = (counter/recipe.ingredients.length)*100
          if(percentageMatch > 25 || recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
            let newObj = Object.assign({}, recipe, {percentageMatch: percentageMatch})
            if(filteredRecipes.length === 0){
              filteredRecipes.push(newObj)
            } else{
              if(filteredRecipes.find(filRecipe => filRecipe.id === recipe.id) === undefined){
                filteredRecipes.push(newObj)
              } else{
                return
              }
            }
          }
        }
      })
      this.setState({matchedRecipes: filteredRecipes, allMatchedRecipes: filteredRecipes})
    })
  }

  showRecipeDetails=(details, key)=>{
    if(key === "calendar"){
      APIManager.getOneFromCategory("fullRecipes", details.recipeDetails.recipe_Id)
      .then((response)=>{
        this.setState({
          recipeDetails: response,
          recipe_Id: details.id,
          date: moment(details.start).format("YYYY-MM-DD"),
          activeRecipeKey: details.eventId,
          viewRecipeDetails: true,
          open: true,
        })
      })
    }
     else if(key === "suggestionEngine"){
       if(details.recipe_Id === "leftovers" || details.recipe_Id === "eatOut"){
         APIManager.getOneFromCategory("fullRecipes", details.recipe_Id)
         .then((response)=> {
           this.setState({
             recipeDetails: response,
             activeRecipeKey: details.id,
             viewRecipeDetails: true,
             open: true,
             getStarted: true,
           })
         })
       } else{
        //  Eventually will need to swap this section of code out for Yummly API call
         APIManager.getOneFromCategory("fullRecipes",details.recipe_Id)
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
  }

  // showRecipeDetails=(details, key)=>{
  //   if(key === "calendar"){
  //     APIManager.getRecipeDetails(details.id)
  //     .then((response)=>{
  //       this.setState({
  //         recipeDetails: response,
  //         recipe_Id: details.id,
  //         date: moment(details.start).format("YYYY-MM-DD"),
  //         activeRecipeKey: details.eventId,
  //         viewRecipeDetails: true,
  //         open: true,
  //       })
  //     })
  //   }
  //    else if(key === "suggestionEngine"){
  //     APIManager.getRecipeDetails(details.recipe_Id)
  //     .then((response)=>{
  //       this.setState({
  //         recipeDetails: response,
  //         activeRecipeKey: details.id,
  //         viewRecipeDetails: true,
  //         open: true,
  //         getStarted: true,
  //       })
  //     })
  //   }
  // }

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

  handleCalendarChange=(key, id, date)=>{
    if(key === "existingRecipe"){
      let updatedRecipe ={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        date: date,
      }
      APIManager.updateItem("usersRecipes", this.state.activeRecipeKey, updatedRecipe)
      .then(()=> {
        this.updateData()
        this.closeRecipeDetails()
      })
    } else if(key === "newRecipe"){
      let newRecipe={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        recipe_Num: this.state.activeRecipeKey,
        date: date,
      }
      APIManager.saveItem("usersRecipes", newRecipe)
      .then(()=>{
        this.updateData()
        this.closeRecipeDetails()
      })
    }
  }

  handleFilterChange = (evt)=>{
    let checkbox = evt.target
    let selectedFilters = []
    let activeFilter_cuisine = []
    let activeFilter_course = []
    selectedFilters = this.state.filterCriteria
    if(this.state.filterCriteria.length === 0){
      if(checkbox.checked){
        selectedFilters.push(checkbox.id)
        this.setState({filterCriteria: [checkbox.id]})
      }
    } else{
      if(checkbox.checked){
        if(!selectedFilters.includes(checkbox.id)){
          selectedFilters.push(checkbox.id)
          this.setState({filterCriteria: selectedFilters})
        }
      } else if(!checkbox.checked){
        if(selectedFilters.includes(checkbox.id)){
          let updatedFilters = selectedFilters.filter(item => item !== checkbox.id)
          selectedFilters = updatedFilters
          this.setState({filterCriteria: updatedFilters})
        }
      }
    }
    selectedFilters.forEach(filter =>{
      let splitDetails = filter.split("-")
      if(splitDetails[0] === "cuisine"){
        this.state.cuisines.forEach(cuisine =>{
          if(cuisine.id === parseInt(splitDetails[1])){
            activeFilter_cuisine.push(cuisine.text)
          }
        })
      } else if(splitDetails[0] === "course"){
        this.state.courses.forEach(course =>{
          if(course.id === parseInt(splitDetails[1])){
            activeFilter_course.push(course.text)
          }
        })
      }
    })
    this.displayFilteredRecipes(activeFilter_cuisine, activeFilter_course)
  }

  displayFilteredRecipes = (cuisines, courses)=>{
    let filteredRecipes = []
    let doubleFilter = []
    if(cuisines.length){
      if(!courses.length){
        //If there are only cuisine filters selected and nothing else, execute the below function
        cuisines.forEach(cuisine =>{
          this.state.allMatchedRecipes.forEach(recipe =>{
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined && recipe.attributes.cuisine.length !== 0 && recipe.attributes.cuisine.length !== null){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    filteredRecipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matchedRecipes: filteredRecipes})
      } else if(courses.length){
        //If both cuisine and course filters have been selected, execute the below function
        cuisines.forEach(cuisine =>{
          this.state.allMatchedRecipes.forEach(recipe => {
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    filteredRecipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        courses.forEach(course =>{
          filteredRecipes.forEach(recipe => {
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    doubleFilter.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matchedRecipes: doubleFilter})
      }
    } else if(courses.length){
      if(!cuisines.length){
        courses.forEach(course =>{
          this.state.allMatchedRecipes.forEach(recipe =>{
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    filteredRecipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matchedRecipes: filteredRecipes})
      } else if(cuisines.length){
        courses.forEach(course => {
          this.state.allMatchedRecipes.forEach(recipe =>{
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    filteredRecipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        cuisines.forEach(cuisine =>{
          filteredRecipes.forEach(recipe =>{
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    doubleFilter.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matchedRecipes: doubleFilter})
      }
    }
    else if(cuisines.length === 0 && courses.length === 0){
      this.setState({matchedRecipes: this.state.allMatchedRecipes})
    }
  }


  render(){
    if(this.state.viewRecipeDetails === true){
      return <RecipeModal recipeDetails={this.state.recipeDetails} getStarted={this.state.getStarted} closeRecipeDetails={this.closeRecipeDetails} handleCalendarChange={this.handleCalendarChange} deleteRecipe={this.deleteRecipe} date={this.state.date} open={this.state.open} recipe_id={this.state.recipe_Id}/>
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
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '2vh'}}>
              <Header as="h2" textAlign="center" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{maxWidth: '80vw', height: '50vh'}}>
            <Grid.Column textAlign="left" style={{width: '20%', height: '50vh'}} className="displayRecipes">
              <FilterRecipes filterRecipes={this.handleFilterChange} courses={this.state.courses} cuisines={this.state.cuisines}/>
            </Grid.Column>
            <Grid.Column style={{width: '80%', height: '50vh'}} className="displayRecipes">
              <RecipeSuggestionEngine  matchedRecipes = {this.state.matchedRecipes}showRecipeDetails={this.showRecipeDetails} closeRecipeDetails={this.closeRecipeDetails}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign="bottom">
            <Grid.Column verticalAlign="bottom" style={{maxWidth: '80vw', height: '35vh'}} className="calendar">
              <RecipeCalendar activeUser={this.props.activeUser} events= {this.state.events} showRecipeDetails={this.showRecipeDetails} closeRecipeDetails={this.closeRecipeDetails}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}

  /*
    NOTE: THE BELOW FUNCTIONS WILL DELETE EVERY RECIPE IN YOUR DATABASE IF YOU'RE NOT CAREFUL. ONLY TO BE USED WITH EXTREME CAUTION
  */
  // cleanDatabase=()=>{
  //   let removableData=[]
  //   APIManager.getAllCategory("recipes").then(recipes => {
  //     recipes.forEach(recipe =>{
  //       recipe.attributes.course.forEach(item => {
  //         if(item === "Breakfast and Brunch"){
  //           removableData.push(recipe)
  //         }
  //       })
  //     })
  //     this.removeFromDatabase(removableData)
  //     // console.log(removableData)
  //   })
  // }

  // removeFromDatabase=(recipes)=>{
  //   // console.log(recipes)
  //   recipes.forEach(recipe =>{
  //     APIManager.deleteItem("recipes", recipe.id)
  //   })
  // }