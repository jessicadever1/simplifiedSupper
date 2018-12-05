/*

When the user selects a type of cuisine
Then they will be presented with the opportunity to narrow their search by type of dish or protein

When the user selects the sub-category of their choice
Then they will be taken to the recipe suggestion engine with the result that best match what they have selected
And the user will be allowed to click each of the recipe cards to pull up the full details

When the user clicks any of the recipe cards, they will be taken to the appropriate recipe details (see #6 )
And be given the affordance to select the date they would like to make that recipe
*/

import React, {Component} from 'react'
import GetStartedCategory from './GetStartedCategory'
import GetStartedDish from './GetStartedDish'
import GetStartedProtein from './GetStartedProtein'


export default class GetStarted extends Component{
  state={
    category: "",
    dish: "",
    protein: "",
    selectedCategory: false,
    selectedDish: false,
    selectedProtein: false,
  }
  handleDropdownChange =(e, {name, value}) => this.setState({ [name]: value})

  handleButtonClick=(evt)=>{
    if(evt.target.id === "category"){
      this.setState({selectedCategory: true})
      return
    } else if(evt.target.id === "dish"){
      this.setState({selectedDish: true})
      return
    } else if(evt.target.id === "protein"){
      this.setState({selectedProtein: true})
      return
    }
  }
  render(){
    let getStarted=""
    if(this.state.selectedCategory === false){
      getStarted = <GetStartedCategory handleButtonClick={this.handleButtonClick} activeUser={this.props.activeUser} handleDropdownChange={this.handleDropdownChange}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === false){
      getStarted = <GetStartedDish handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange} category={this.state.category}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === true && this.state.selectedProtein === false){
      getStarted = <GetStartedProtein handleButtonClick={this.handleButtonClick} handleDropdownChange={this.handleDropdownChange}/>
    }
    return(
      <React.Fragment>
        {getStarted}
      </React.Fragment>
    )
  }
}