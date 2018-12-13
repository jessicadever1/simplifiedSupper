import React, { Component } from 'react'
import { Menu} from 'semantic-ui-react'
import LogIn from './LogIn';
import Register from './Register';

export default class LogInOrRegister extends Component {
  state = { activeItem: 'LogIn' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    let LogInOrRegister = ""
    if (activeItem === "LogIn"){
      LogInOrRegister = <LogIn loginFunction={this.props.loginFunction} handleFieldChange={this.props.handleFieldChange} handleFormSubmit={this.props.handleFormSubmit} state={this.props.state}/>
    } else if (activeItem === "Register"){
      LogInOrRegister = <Register securityQuestions={this.props.securityQuestions} createNewUser={this.props.createNewUser} handleFieldChange={this.props.handleFieldChange} handleFormSubmit={this.props.handleFormSubmit}activeUser={this.props.activeUser}/>
    }

    return (
      <React.Fragment>
            <Menu pointing secondary>
              <Menu.Item
                name='LogIn'
                active={activeItem === 'LogIn'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Register'
                active={activeItem === 'Register'}
                onClick={this.handleItemClick}
              />
            </Menu>
            {LogInOrRegister}
      </React.Fragment>
    )
  }
}
