import React, {Component} from 'react'
import {Segment, Sidebar, Menu, Form} from 'semantic-ui-react'

export default class FilterRecipes extends Component{
  state={
    visible: false
  }

  render(){
    return(
      <React.Fragment>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            icon="labeled"
            onHide={this.handleSidebarHide}
            vertical
            visible={this.props.visible}
            width="thin">
              <Menu.item name="Cuisines">
              </Menu.item>
              <Menu.item>Courses</Menu.item>
              <Menu.item>Rating</Menu.item>
            </Sidebar>
        </Sidebar.Pushable>
      </React.Fragment>
    )
  }
}

//   <Sidebar.Pushable as={Segment}>
//   <Sidebar
//     as={Menu}
//     animation='overlay'
//     icon='labeled'
//     inverted
//     onHide={this.handleSidebarHide}
//     vertical
//     visible={visible}
//     width='thin'
//   >
//     <Menu.Item as='a'>
//       <Icon name='home' />
//       Home
//     </Menu.Item>
//     <Menu.Item as='a'>
//       <Icon name='gamepad' />
//       Games
//     </Menu.Item>
//     <Menu.Item as='a'>
//       <Icon name='camera' />
//       Channels
//     </Menu.Item>
//   </Sidebar>

//   <Sidebar.Pusher>
//     <Segment basic>
//       <Header as='h3'>Application Content</Header>
//       <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//     </Segment>
//   </Sidebar.Pusher>
// </Sidebar.Pushable>
// </div>
// )
// }
// }