import React, {Component} from 'react'

export default class GetStartedDish extends Component{
  render(){
    return(
      <React.Fragment>
        Get Started Dish Component
        <div>Mmmm...CATEGORY food sounds delicious. Lte's get a little bit more selective</div>
        <button id="dish" onClick={this.props.handleButtonClick}>Next Page</button>
      </React.Fragment>
    )
  }
}