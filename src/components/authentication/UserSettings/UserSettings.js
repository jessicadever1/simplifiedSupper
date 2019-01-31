import React, {Component} from 'react'
import ViewUser from './ViewUser'
import EditUser from './EditUser'
import { Segment } from 'semantic-ui-react';

export default class UserSettings extends Component{

  state = { activeItem: 'View Profile'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render(){
    const {activeItem} = this.state
    let ViewOrEdit = ""
    if(activeItem === 'View Profile'){
      ViewOrEdit = <ViewUser activeUser={this.props.activeUser} handleItemClick={this.handleItemClick}/>
    } else if(activeItem === 'Edit Profile'){
      ViewOrEdit = <EditUser handleFormSubmit={this.props.handleFormSubmit} handleFieldChange ={this.props.handleFieldChange} handleItemClick={this.handleItemClick} state={this.props.state} activeUser={this.props.activeUser} securityQuestions={this.props.securityQuestions}/>
    }
    return(
      <React.Fragment>
        <Segment raised>
          <Segment size="large">
            {ViewOrEdit}
          </Segment>
        </Segment>
      </React.Fragment>
    )
  }

}