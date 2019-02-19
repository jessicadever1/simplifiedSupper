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
    view_recipe_details: false,
    get_started: false,
    open: false,
    active_recipe_key: "",
    date: "",
    recipe_id: "",
    visible: false,
    recipe_details: [],
    events: [],
    cuisines: [],
    courses: [],
    ingredients: [],
    matched_recipes: [],
    all_matched_recipes: [],
    filter_criteria: [],
  }

  componentDidMount=()=>{
    this.update_data()
  }

  update_data=()=>{
    APIManager.getAllCategory("usersRecipes")
    .then((usersRecipes)=>{
      let recipe_events = []
      usersRecipes.forEach(recipe => {
        if(recipe.user_Id === parseInt(sessionStorage.getItem("id"))){
          recipe_events.push(APIManager.getOneFromCategory("recipes", recipe.recipe_Num)
          .then((response)=> {
            let expandedRecipe = {
              id: recipe.recipe_Id,
              eventId: recipe.id,
              title: response.recipeName,
              allDay: true,
              start: recipe.date,
              end: recipe.date,
              recipe_details: response
            }
            return expandedRecipe
          })
          )
        } else{
          return
        }
      })
      return Promise.all(recipe_events)
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
    .then(()=> this.create_ingredient_list())
  }

  create_ingredient_list=()=>{
    let selected_ingredients = []
    let thisWeek = moment().week()
    this.state.events.forEach(event =>{
      //Check to see if recipe is scheduled for this week
      if(moment(event.start).week() === thisWeek){
        event.recipe_details.ingredients.forEach(ingredient =>{
          //Check to see if ingredient already exists in array
          if(selected_ingredients.length === 0 && ingredient !== " "){
            selected_ingredients.push(ingredient)
          } else if(ingredient !== " "){
            if(!selected_ingredients.includes(ingredient)){
              selected_ingredients.push(ingredient)
            }
          }
        })
      }
    })
    this.setState({ingredients: selected_ingredients})
    this.percentage_match_calculator()
  }

  percentage_match_calculator=()=>{
    let scheduled_recipes = []
    let this_week = moment().week()
    let filtered_recipes = []
    this.state.events.forEach(event =>{
      if(moment(event.start).week() === this_week){
        scheduled_recipes.push(event.recipe_details.id)
      }
    })
    APIManager.getAllCategory("recipes")
    .then((recipes)=>{
      recipes.forEach(recipe =>{
        //Remove the recipes that are already scheduled for the week
        if(!scheduled_recipes.includes(recipe.id)){
          let counter = 0
          recipe.ingredients.forEach(ingredient =>{
            if(this.state.ingredients.includes(ingredient)){
              counter +=1
            }
          })
          let percentage_match = (counter/recipe.ingredients.length)*100
          if(percentage_match > 25 || recipe.recipe_Id === "leftovers" || recipe.recipe_Id === "eatOut"){
            let new_obj = Object.assign({}, recipe, {percentage_match: percentage_match})
            if(filtered_recipes.length === 0){
              filtered_recipes.push(new_obj)
            } else{
              if(filtered_recipes.find(filRecipe => filRecipe.id === recipe.id) === undefined){
                filtered_recipes.push(new_obj)
              } else{
                return
              }
            }
          }
        }
      })
      this.setState({matched_recipes: filtered_recipes, all_matched_recipes: filtered_recipes})
    })
  }

  show_recipe_details=(details, key)=>{
    if(key === "calendar"){
      APIManager.getOneFromCategory("fullRecipes", details.recipe_details.recipe_Id)
      .then((response)=>{
        this.setState({
          recipe_details: response,
          recipe_Id: details.id,
          date: moment(details.start).format("YYYY-MM-DD"),
          active_recipe_key: details.eventId,
          view_recipe_details: true,
          open: true,
        })
      })
    }
     else if(key === "suggestionEngine"){
       if(details.recipe_Id === "leftovers" || details.recipe_Id === "eatOut"){
         APIManager.getOneFromCategory("fullRecipes", details.recipe_Id)
         .then((response)=> {
           this.setState({
             recipe_details: response,
             active_recipe_key: details.id,
             view_recipe_details: true,
             open: true,
             get_started: true,
           })
         })
       } else{
        //  Eventually will need to swap this section of code out for Yummly API call
         APIManager.getOneFromCategory("fullRecipes",details.recipe_Id)
         .then((response)=>{
           this.setState({
             recipe_details: response,
             active_recipe_key: details.id,
             view_recipe_details: true,
             open: true,
             get_started: true,
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

  close_recipe_details=()=>{
    this.setState({view_recipe_details: false, open: false, get_started: false})
  }

  delete_recipe=()=>{
    APIManager.deleteItem("usersRecipes", this.state.active_recipe_key)
    .then(()=>{
      this.update_data()
      this.close_recipe_details()
    })
  }

  handle_calendar_change=(key, id, date)=>{
    if(key === "existingRecipe"){
      let updated_recipe ={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        date: date,
      }
      APIManager.updateItem("usersRecipes", this.state.active_recipe_key, updated_recipe)
      .then(()=> {
        this.update_data()
        this.close_recipe_details()
      })
    } else if(key === "newRecipe"){
      let new_recipe={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        recipe_Num: this.state.active_recipe_key,
        date: date,
      }
      APIManager.saveItem("usersRecipes", new_recipe)
      .then(()=>{
        this.update_data()
        this.close_recipe_details()
      })
    }
  }

  handle_filter_change = (evt)=>{
    let checkbox = evt.target
    let selected_filters = []
    let active_filter_cuisine = []
    let active_filter_course = []
    selected_filters = this.state.filter_criteria
    if(this.state.filter_criteria.length === 0){
      if(checkbox.checked){
        selected_filters.push(checkbox.id)
        this.setState({filter_criteria: [checkbox.id]})
      }
    } else{
      if(checkbox.checked){
        if(!selected_filters.includes(checkbox.id)){
          selected_filters.push(checkbox.id)
          this.setState({filter_criteria: selected_filters})
        }
      } else if(!checkbox.checked){
        if(selected_filters.includes(checkbox.id)){
          let updated_filters = selected_filters.filter(item => item !== checkbox.id)
          selected_filters = updated_filters
          this.setState({filter_criteria: updated_filters})
        }
      }
    }
    selected_filters.forEach(filter =>{
      let split_details = filter.split("-")
      if(split_details[0] === "cuisine"){
        this.state.cuisines.forEach(cuisine =>{
          if(cuisine.id === parseInt(split_details[1])){
            active_filter_cuisine.push(cuisine.text)
          }
        })
      } else if(split_details[0] === "course"){
        this.state.courses.forEach(course =>{
          if(course.id === parseInt(split_details[1])){
            active_filter_course.push(course.text)
          }
        })
      }
    })
    this.display_filtered_recipes(active_filter_cuisine, active_filter_course)
  }

  display_filtered_recipes = (cuisines, courses)=>{
    let filtered_recipes = []
    let double_filter = []
    if(cuisines.length){
      if(!courses.length){
        //If there are only cuisine filters selected and nothing else, execute the below function
        cuisines.forEach(cuisine =>{
          this.state.all_matched_recipes.forEach(recipe =>{
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined && recipe.attributes.cuisine.length !== 0 && recipe.attributes.cuisine.length !== null){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    filtered_recipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matched_recipes: filtered_recipes})
      } else if(courses.length){
        //If both cuisine and course filters have been selected, execute the below function
        cuisines.forEach(cuisine =>{
          this.state.all_matched_recipes.forEach(recipe => {
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    filtered_recipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        courses.forEach(course =>{
          filtered_recipes.forEach(recipe => {
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    double_filter.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matched_recipes: double_filter})
      }
    } else if(courses.length){
      if(!cuisines.length){
        courses.forEach(course =>{
          this.state.all_matched_recipes.forEach(recipe =>{
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    filtered_recipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matched_recipes: filtered_recipes})
      } else if(cuisines.length){
        courses.forEach(course => {
          this.state.all_matched_recipes.forEach(recipe =>{
            if(recipe.attributes.course){
              if(recipe.attributes.course.length !== undefined){
                recipe.attributes.course.forEach(item =>{
                  if(item === course){
                    filtered_recipes.push(recipe)
                  }
                })
              }
            }
          })
        })
        cuisines.forEach(cuisine =>{
          filtered_recipes.forEach(recipe =>{
            if(recipe.attributes.cuisine){
              if(recipe.attributes.cuisine.length !== undefined){
                recipe.attributes.cuisine.forEach(item =>{
                  if(item === cuisine){
                    double_filter.push(recipe)
                  }
                })
              }
            }
          })
        })
        this.setState({matched_recipes: double_filter})
      }
    }
    else if(cuisines.length === 0 && courses.length === 0){
      this.setState({matched_recipes: this.state.all_matched_recipes})
    }
  }


  render(){
    if(this.state.view_recipe_details === true){
      return <RecipeModal recipe_details={this.state.recipe_details} get_started={this.state.get_started} close_recipe_details={this.close_recipe_details} handle_calendar_change={this.handle_calendar_change} delete_recipe={this.delete_recipe} date={this.state.date} open={this.state.open} recipe_id={this.state.recipe_Id}/>
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
              <FilterRecipes filter_recipes={this.handle_filter_change} courses={this.state.courses} cuisines={this.state.cuisines}/>
            </Grid.Column>
            <Grid.Column style={{width: '80%', height: '50vh'}} className="displayRecipes">
              <RecipeSuggestionEngine  matched_recipes = {this.state.matched_recipes}show_recipe_details={this.show_recipe_details} close_recipe_details={this.close_recipe_details}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign="bottom">
            <Grid.Column verticalAlign="bottom" style={{maxWidth: '80vw', height: '35vh'}} className="calendar">
              <RecipeCalendar active_user={this.props.active_user} events= {this.state.events} show_recipe_details={this.show_recipe_details} close_recipe_details={this.close_recipe_details}/>
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