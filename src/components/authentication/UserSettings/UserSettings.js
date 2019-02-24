import React, {Component} from 'react'
import ViewUser from './ViewUser'
import EditUser from './EditUser'
import { Segment } from 'semantic-ui-react';

export default class UserSettings extends Component{

  state = { active_item: 'View Profile'}

  handle_item_click = (e, {name}) => this.setState({active_item: name})

  render(){
    const {active_item} = this.state
    let view_or_edit = ""
    if(active_item === 'View Profile'){
      view_or_edit = <ViewUser active_user={this.props.active_user} handle_item_click={this.handle_item_click}/>
    } else if(active_item === 'Edit Profile'){
      view_or_edit = <EditUser handle_form_submit={this.props.handle_form_submit} handle_field_change ={this.props.handle_field_change} handle_item_click={this.handle_item_click} state={this.props.state} active_user={this.props.active_user} security_questions={this.props.security_questions}/>
    }
    return(
      <React.Fragment>
        <Segment raised>
          <Segment size="large">
            {view_or_edit}
          </Segment>
        </Segment>
      </React.Fragment>
    )
  }

}