import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Dropdown} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

//TODO: Need to set up routing that if no user is logged in, the nav bar is not visible
//TODO: Need to add the simplified supper logo to the nav bar
export default class NavBar extends Component{
  state={
    activeItem: 'home',
  }

  componentDidMount=()=>{
    console.log(this.props)
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
              <Dropdown.Item as={Link} to="/viewProfile" name='viewProfile' active={activeItem === 'viewProfile'} onClick={this.handleItemClick}>View Profile</Dropdown.Item>
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
{/* <Menu vertical>
<Dropdown item text='Categories'>
  <Dropdown.Menu>
    <Dropdown.Item>Electronics</Dropdown.Item>
    <Dropdown.Item>Automotive</Dropdown.Item>
    <Dropdown.Item>Home</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</Menu> */}

// import React, { Component } from 'react'
// import { Menu, Segment } from 'semantic-ui-react'

// export default class MenuExampleSecondaryPointing extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <div>
//         <Menu pointing secondary>
//           <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
//           <Menu.Item
//             name='messages'
//             active={activeItem === 'messages'}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name='friends'
//             active={activeItem === 'friends'}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Menu position='right'>
//             <Menu.Item
//               name='logout'
//               active={activeItem === 'logout'}
//               onClick={this.handleItemClick}
//             />
//           </Menu.Menu>
//         </Menu>

//         <Segment>
//           <img src='/images/wireframe/media-paragraph.png' />
//         </Segment>
//       </div>
//     )
//   }
// }