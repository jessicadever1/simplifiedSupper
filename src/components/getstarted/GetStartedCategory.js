import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

export default class GetStartedCategory extends Component{
  state={
    categories: []
  }

  componentDidMount=()=>{
    APIManager.getAllCategory("cuisines").then((cuisines)=> this.setState({categories: cuisines}))
  }

  render(){
    return(
      <React.Fragment>
        <div>Welcome, {this.props.activeUser.firstName}! Thanks for joining Simplified Supper. Let's get you started by selecting your first recipe. </div>
        <Form>
          <Form.Select label="What are you in the mood for?" options={this.state.categories} />
        </Form>
        <button id="category" onClick={this.props.handleButtonClick}>Next Page</button>
      </React.Fragment>
    )
  }
}
