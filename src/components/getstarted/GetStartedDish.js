import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

export default class GetStartedDish extends Component{
  state={
    dishes: []
  }

  componentDidMount=()=>{
    APIManager.getAllCategory("courses").then((courses)=> this.setState({dishes: courses}))
  }

  render(){
    return(
      <React.Fragment>
        <div>Mmmm...{this.props.category} food sounds delicious. Let's get a little bit more selective</div>
        <Form>
          <Form.Select label="What type of dish would you like to make?" options={this.state.dishes} name="dish" onChange={this.props.handleDropdownChange} />
        </Form>
        <button id="dish" onClick={this.props.handleButtonClick}>Next Page</button>
      </React.Fragment>
    )
  }
}
