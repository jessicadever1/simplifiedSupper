import React, {Component} from 'react'

export default class GetStartedProtein extends Component{
  render(){
    return(
      <React.Fragment>
        Get Started Protein Component
        <button id="protein" onClick={this.props.handleButtonClick}>Next</button>
      </React.Fragment>
    )
  }
}