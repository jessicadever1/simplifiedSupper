/*

When the user clicks any of the recipe cards, they will be taken to the appropriate recipe details (see #6 )
And be given the affordance to select the date they would like to make that recipe
*/

import React, {Component} from 'react'
import GetStartedCategory from './GetStartedCategory'
import GetStartedDish from './GetStartedDish'
// import GetStartedProtein from './GetStartedProtein'
import SuggestedRecipes from './SuggestedRecipes';
import APIManager from '../../modules/APIManager';


export default class GetStarted extends Component{
  state={
    category: "",
    dish: "",
    protein: "",
    selectedCategory: false,
    selectedDish: false,
    selectedProtein: false,
    matches: []
  }
  handleDropdownChange =(e, {name, value}) => this.setState({ [name]: value})

  handleButtonClick=(evt)=>{
    if(evt.target.id === "category"){
      this.setState({selectedCategory: true})
      return
    } else if(evt.target.id === "dish"){
      APIManager.newUserSuggestedRecipes(this.state.category, this.state.dish)
      .then((response)=>{
        console.log(response)
        this.setState({
          matches: response,
          selectedDish: true
        })
      })
    }
    // else if(evt.target.id === "protein"){
    //   this.setState({selectedProtein: true})
    //   return
    // }
  }
  render(){
    let getStarted=""
    if(this.state.selectedCategory === false){
      getStarted = <GetStartedCategory handleButtonClick={this.handleButtonClick} activeUser={this.props.activeUser} handleDropdownChange={this.handleDropdownChange}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === false){
      getStarted = <GetStartedDish handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange} category={this.state.category}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === true){
      getStarted = <SuggestedRecipes matches={this.state.matches}/>
    }
    // else if(this.state.selectedCategory === true && this.state.selectedDish === true && this.state.selectedProtein === false){
    //   getStarted = <GetStartedProtein handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange}/>
    // } else if(this.state.selectedCategory === true && this.state.selectedDish === true && this.state.selectedProtein === true){
    //   getStarted = <SuggestedRecipes />
    // }
    return(
      <React.Fragment>
        {getStarted}
      </React.Fragment>
    )
  }
}