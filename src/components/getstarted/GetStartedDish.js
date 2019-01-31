import React, {Component} from 'react'
import {Form, Grid, Button, Header} from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';

export default class GetStartedDish extends Component{
  state={
    dishes: []
  }

  componentDidMount=()=>{
    APIManager.getAllCategory("courses").then((courses)=> this.setState({dishes: courses}))
  }

  render(){
    return(
      <React.Fragment>
      <div className="getStarted-dish">
        <style>{`
          body > div,
          body > div > div
          body > div > div > div.getStarted-dish{
            height: 100%
          }`}</style>
      <Grid textAlign="center" style={{height: '100%'}}>
        <Grid.Row>
          <Grid.Column style={{maxWidth: '80vw', height: '25vh'}}/>
        </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '15vh'}}>
              <Header as="h1" color="teal" textAlign="center">
                Mmmm...{this.props.category} food sounds delicious. Let's get a little bit more selective.
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '15vh'}} >
              <Form>
                <Form.Select label="What type of dish would you like to make?" options={this.state.dishes} name="dish" onChange={this.props.handleDropdownChange}/>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{maxWidth: '80vw', height: '40vh'}}>
              <Button primary id="dish" onClick={this.props.handleButtonClick} content="Next Page"/>
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </div>
    </React.Fragment>
    )
  }
}
