import React, { Component } from 'react'
import { Menu} from 'semantic-ui-react'
import LogIn from './LogIn';
import Register from './Register';

export default class LogInOrRegister extends Component {
  state = { active_item: 'LogIn' }

  handle_item_click = (e, { name }) => this.setState({ active_item: name })

  render() {
    const { active_item } = this.state
    let log_in_or_register = ""
    if (active_item === "LogIn"){
      log_in_or_register = <LogIn login_function={this.props.login_function} handle_field_change={this.props.handle_field_change} handle_form_submit={this.props.handle_form_submit} state={this.props.state}/>
    } else if (active_item === "Register"){
      log_in_or_register = <Register security_questions={this.props.security_questions} create_new_user={this.props.create_new_user} handle_field_change={this.props.handle_field_change} handle_form_submit={this.props.handle_form_submit} active_user={this.props.active_user}/>
    }

    return (
      <React.Fragment>
            <Menu pointing secondary>
              <Menu.Item
                name='LogIn'
                active={active_item === 'LogIn'}
                onClick={this.handle_item_click}
              />
              <Menu.Item
                name='Register'
                active={active_item === 'Register'}
                onClick={this.handle_item_click}
              />
            </Menu>
            {log_in_or_register}
      </React.Fragment>
    )
  }
}
