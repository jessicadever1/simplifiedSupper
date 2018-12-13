import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Dropdown} from 'semantic-ui-react'

//TODO: Need to add the simplified supper logo to the nav bar
export default class NavBar extends Component{
  state={
    activeItem: 'home',
  }


  handleItemClick=(e, {name}) => this.setState({activeItem: name})

  render(){
  const {activeItem} = this.state
  if(sessionStorage.getItem("id") !== null){
    return <React.Fragment>
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item/>
        <Menu.Menu position="right">
          <Dropdown
            item
            text={this.props.activeUser.firstName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/ViewProfile"
                name='viewProfile'
                active={activeItem === 'viewProfile'}
                onClick={this.handleItemClick}
                content="Account Settings"
              />
              <Dropdown.Item
                as={Link}
                to="/logout"
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
                content="Log Out"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  }
  else{
    return <React.Fragment>
      <Menu pointing secondary>
        <Menu.Item />
        <Menu.Item position="right" content="Please Log In"/>
      </Menu>
    </React.Fragment>
  }
}
}