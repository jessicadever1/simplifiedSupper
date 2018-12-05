import React, {Component} from 'react'
import {Placeholder} from 'semantic-ui-react'

export default class ViewUser extends Component{

  render(){
    return(
      <Placeholder style={{height: 150, width: 150}}>
        <Placeholder.Image />
      </Placeholder>
    )
  }
}