import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Dropdown} from 'semantic-ui-react'

//TODO: Need to set up routing that if no user is logged in, the nav bar is not visible
//TODO: Need to add the simplified supper logo to the nav bar
export default class NavBar extends Component{
  state={
    activeItem: 'home',
  }


  handleItemClick=(e, {name}) => this.setState({activeItem: name})

render(){
  const {activeItem} = this.state
  let activeUserName = ""
  if(this.props.activeUser === undefined || this.props.activeUser.length === 0){
    activeUserName = "Welcome, please LogIn"
  } else{
    activeUserName = this.props.activeUser.firstName
  }


  return(
    <React.Fragment>
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Dropdown item text={activeUserName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/ViewProfile" name='viewProfile' active={activeItem === 'viewProfile'} onClick={this.handleItemClick}>View Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/logout" name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item></Menu.Item>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  )
}
}