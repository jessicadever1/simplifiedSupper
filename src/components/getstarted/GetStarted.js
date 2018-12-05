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
      getStarted = <GetStartedCategory handleButtonClick={this.handleButtonClick} activeUser={this.props.activeUser}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === false){
      getStarted = <GetStartedDish handleButtonClick={this.handleButtonClick}/>
    } else if(this.state.selectedCategory === true && this.state.selectedDish === true && this.state.selectedProtein === false){
      getStarted = <GetStartedProtein handleButtonClick={this.handleButtonClick}/>
    }
    return(
      <React.Fragment>
        {getStarted}
      </React.Fragment>
    )
  }
}