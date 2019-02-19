import React, {Component} from 'react'
import GetStartedCategory from './GetStartedCategory'
import GetStartedDish from './GetStartedDish'
import SuggestedRecipes from '../RecipeComponents/RecipeSuggestionEngine/GetStartedSuggestions/SuggestedRecipes';
import APIManager from '../../modules/APIManager';

//TODO: Find a way to store where the user is in the get started process so you can come back to the phase in the process if they leave before completion
export default class GetStarted extends Component{
  state={
    category: "",
    dish: "",
    selected_category: false,
    selected_dish: false,
    open: false,
    show_recipe: false,
    get_started: true,
    active_recipe_key: "",
    recipe_details: [],
    matches: []
  }
  handle_dropdown_change =(e, {name, value}) => this.setState({ [name]: value})

  handle_button_click=(evt)=>{
    if(evt.target.id === "category"){
      this.setState({selected_category: true})
      return
    } else if(evt.target.id === "dish"){
      let matched_recipes = []
      let course_match=[]
      let assigned_course = ""
      if(this.state.dish === "Main+Dishes" || this.state.dish === "Side+Dishes" || this.state.dish === "Lunch+and+Snacks"){
        if(this.state.dish === "Main+Dishes"){
          assigned_course = "Main Dishes"
        } else if(this.state.dish === "Side+Dishes"){
          assigned_course = "Side Dishes"
        } else if(this.state.dish === "Lunch+and+Snacks"){
          assigned_course = "Lunch and Snacks"
        }
      } else{
        assigned_course = this.state.dish
      }
      APIManager.getAllCategory("recipes")
      .then(recipes => {
        recipes.forEach(recipe =>{
          recipe.attributes.course.forEach(course=>{
            if(course === assigned_course){
              course_match.push(recipe)
            }
          })
        })
        course_match.forEach(course =>{
          if(course.attributes.cuisine){
            course.attributes.cuisine.forEach(cuisine =>{
              if(cuisine.toLowerCase() === this.state.category){
                if(matched_recipes.length === 0){
                  matched_recipes.push(course)
                } else{
                  if(!matched_recipes.find(recipe => recipe.id === course.id)){
                    matched_recipes.push(course)
                  }
                }
              }
            })
          }
        })
        this.setState({
          matches: matched_recipes,
          selected_dish: true
        })
      })
    } else if(evt.target.id === "start_over"){
      this.setState({
        selected_category: false,
        selected_dish: false,
        matches: [],
        category: "",
        dish: ""
      })
    }
  }

  close_recipe_details=()=>{
    this.setState({show_recipe: false, open: false})
  }

  see_recipe_details=(id, num)=>{
    APIManager.getOneFromCategory("fullRecipes",id)
    .then((response)=>{
      this.setState({
        recipe_details: response,
        active_recipe_key: num,
        show_recipe: true,
        open: true,
      })
    })
  }

  //FAKE RECIPES:
  //After Demo, be sure to update the following recipes in the "recipes" collection back to the correct recipe_Id, remove the full recipes collection, remove any UsersRecipes with substituted recipe info, git rid of see recipe details that call local server found on get started and home files, update api manager file to include yummly api call
  // 3354
  // "Avgolemono-Soup-_aka-Greek-Lemon-Chicken-Soup_-1587365"
  // 3222
  // "Baba-ganoush-310030"
  // 2332
  // "Thai-Coconut-Soup-1045980"


  // seeRecipeDetails=(id, num)=>{
  //   APIManager.getRecipeDetails(id)
  //   .then((response)=>{
  //   this.setState({
  //     recipeDetails: response,
  //     activeRecipeKey: num,
  //     showRecipe: true,
  //     open: true,
  //   })
  // }
  //   )
  // }

  handle_calendar_change=(key, id, date)=>{
    if(key === "new_recipe"){
      let new_recipe={
        user_Id: parseInt(sessionStorage.getItem("id")),
        recipe_Id: id,
        recipe_Num: this.state.active_recipe_key,
        date: date
      }
      APIManager.saveItem("usersRecipes", new_recipe)
      .then(()=> this.props.history.push("/"))
    }
  }

  render(){
    if(this.state.selected_category === false){
      return <GetStartedCategory handle_button_click={this.handle_button_click} active_user={this.props.active_user} handle_dropdown_change={this.handle_dropdown_change}/>
    } else if(this.state.selected_category === true && this.state.selected_dish === false){
      return <GetStartedDish handle_button_click={this.handle_button_click} handle_dropdown_change={this.handle_dropdown_change} category={this.state.category}/>
    } else if(this.state.selected_category === true && this.state.selected_dish === true){
      return <SuggestedRecipes handle_calendar_change={this.handle_calendar_change} matches={this.state.matches} category={this.state.category} dish={this.state.dish} handle_button_click={this.handle_button_click} see_recipe_details={this.see_recipe_details} close_recipe_details={this.close_recipe_details} get_started={this.state.get_started} recipe_details={this.state.recipe_details} active_recipe_key={this.state.active_recipe_key} show_recipe={this.state.show_recipe} open={this.state.open}/>
    }
}
}