import React, {Component} from 'react'
import {Form, Header, Grid, Button} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

export default class GetStartedCategory extends Component{
  state={
    categories: []
  }

  componentDidMount=()=>{
    APIManager.getAllCategory("cuisines").then((cuisines)=> this.setState({categories: cuisines}))
  }

  render(){
    return(
      <React.Fragment>
        <div className="getStarted-category">
          <style>{`
            body > div,
            body > div > div
            body > div > div > div.getStarted-category{
              height: 100%
            }`}</style>
        <Grid textAlign="center" style={{height: '100%'}}>
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '25vh'}}>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{maxWidth: '80vw', height: '15vh'}}>
                <Header as="h1" color="teal" textAlign="center">
                  Welcome, {this.props.active_user.first_name}!
                  Thanks for joining Simplified Supper. Let's get started by selecting your first recipe.
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{maxWidth: '80vw', height: '15vh'}} >
                <Form>
                  <Form.Select label="What are you in the mood for?" options={this.state.categories} name="category" onChange={this.props.handle_dropdown_change}/>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{maxWidth: '80vw', height: '40vh'}}>
                <Button primary id="category" onClick={this.props.handle_button_click} content="Next Page"/>
              </Grid.Column>
            </Grid.Row>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}
