import React, {Component} from 'react'
import {Button, Placeholder, Grid, Header, Segment, Image, Divider, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

//TODO: Add Simplified Supper logo to header
//TODO: If user wants to update password, they must first confirm their old password to make that change
//TODO: Swap password view out with a protected version
//TODO: Icon for profile settings
export default class ViewUser extends Component{

  render(){
    return(
      <React.Fragment>
        <div className="view-user">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.view-user{
              height: 100%
            }`}</style>
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
              <Segment fluid raised>
                <Header
                  as="h2"
                  color="teal"
                  textAlign="center"
                  content="Simplified Supper"
                  attached="top"
                />
                <Segment attached size="large">
                  <Segment.Group horizontal>
                    <Segment>
                      <Image size="small" src="https://react.semantic-ui.com/images/wireframe/image.png" floated="left" rounded/>
                    </Segment>
                    <Segment textAlign="left">
                      <List>
                        <List.Item icon="users circle">{this.props.activeUser.firstName} {this.props.activeUser.lastName}</List.Item>
                        <List.Item icon="users" content={this.props.activeUser.username}/>
                        <List.Item icon="mail" content={this.props.activeUser.email} />
                        <List.Item icon="key" content={this.props.activeUser.password} />
                      </List>
                    </Segment>

                  </Segment.Group>
                  <Divider hidden/>
                  <Button
                    color="teal"
                    as={Link}
                    to="/"
                    content="Go Home"
                  />
                <Button
                  color="teal"
                  as={Link}
                  to="/EditProfile"
                  content="Edit Profile"
                />
                </Segment>
              </Segment>
            </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}