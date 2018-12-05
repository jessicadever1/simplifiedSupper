import React, { Component } from 'react'
import { Menu, Header, Icon, Grid } from 'semantic-ui-react'
import LogIn from './LogIn';
import Register from './Register';

//TODO: Insert Simplified Supper Logo in Header

export default class LogInOrRegister extends Component {
  state = { activeItem: 'LogIn' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    let LogInOrRegister = ""
    if (activeItem === "LogIn"){
      LogInOrRegister = <LogIn />
    } else if (activeItem === "Register"){
      LogInOrRegister = <Register securityQuestions={this.props.securityQuestions}/>
    }

    return (
      <React.Fragment>
        <div className="login-form">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.login-form{
              height: 100%;
          }`}</style>
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as="h2" color="teal" textAlign="center">
              Simplified Supper
            </Header>
            <Menu pointing secondary>
              <Menu.Item name='LogIn' active={activeItem === 'LogIn'} onClick={this.handleItemClick} />
              <Menu.Item
                name='Register'
                active={activeItem === 'Register'}
                onClick={this.handleItemClick}
              />
            </Menu>
            {LogInOrRegister}
          </Grid.Column>
        </Grid>
      </div>
      </React.Fragment>
    )
  }
}
