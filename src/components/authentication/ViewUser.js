import React, {Component} from 'react'
import {Button, Placeholder, Grid, Header} from 'semantic-ui-react'
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
              <Header as="h2" color="teal" textAlign="center">
                Simplified Supper
              </Header>
              <Placeholder style={{height: 150, width: 150}}>
                <Placeholder.Image/>
              </Placeholder>
              <div>Full Name</div>
              <div>{this.props.activeUser.firstName} {this.props.activeUser.lastName}</div>
              <div>Username</div>
              <div>{this.props.activeUser.username}</div>
              <div>Email</div>
              <div>{this.props.activeUser.email}</div>
              <div>Password</div>
              <div>{this.props.activeUser.password}</div>
              <Button as={Link} to="/EditProfile">EditProfile</Button>
            </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}