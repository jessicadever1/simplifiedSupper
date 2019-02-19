import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Dropdown} from 'semantic-ui-react'

//TODO: Need to add the simplified supper logo to the nav bar
export default class NavBar extends Component{
  state={
    active_item: 'home',
  }

  is_authenticated = ()=> sessionStorage.getItem("id") !== null

  handle_item_click=(e, {name}) => this.setState({active_item: name})

  render(){
  const {active_item} = this.state
  if(this.is_authenticated()){
    return <React.Fragment>
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/"
          name='home'
          active={active_item === 'home'}
          onClick={this.handle_item_click}
        />
        <Menu.Item/>
        <Menu.Menu position="right">
          <Dropdown
            item
            text={this.props.active_user.first_name}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/ViewProfile"
                name='viewProfile'
                active={active_item === 'viewProfile'}
                onClick={this.handle_item_click}
                content="Account Settings"
              />
              <Dropdown.Item
                as={Link}
                to="/logout"
                name='logout'
                active={active_item === 'logout'}
                onClick={this.handle_item_click}
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