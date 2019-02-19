import React, {Component} from 'react'
import { Menu, Form, Accordion} from 'semantic-ui-react';

export default class FilterRecipes extends Component{
  state = {active_index: 0}

  handle_click = (e, title_props) =>{
    const {index} = title_props
    const {active_index} = this.state
    const new_index = active_index === index ? -1 : index

    this.setState({active_index: new_index})
  }
  make_cuisine_form = (cuisines) =>{
    return <Form className="filter">
      <Form.Group grouped>
        {
          cuisines.map(cuisine =>{
            return <Form.Checkbox key={cuisine.id} label={cuisine.text} id={`cuisine-${cuisine.id}`} onChange={(evt) => this.props.filter_recipes(evt)} value={cuisine.text}/>
          })
        }
      </Form.Group>
    </Form>
  }

  make_course_form = (courses) =>{
    return <Form className="filter">
      <Form.Group grouped>
        {
          courses.map(course =>{
            return <Form.Checkbox key={course.id} label={course.text} id={`course-${course.id}`} value={course.text} onChange={(evt)=> this.props.filter_recipes(evt)}/>
          })
        }
      </Form.Group>
    </Form>
  }

  // makeAllergiesForm = ()=>{
  //   return <Form>
  //     <Form.Group grouped>
  //       <Form.Checkbox label="Dairy" name="Allergies" value="Dairy" />
  //       <Form.Checkbox label="Gluten" name="Allergies" value="Gluten" />
  //       <Form.Checkbox label="Peanut" name="Allergies" value="Peanut" />
  //       <Form.Checkbox label="Seafood" name="Allergies" value="Seafood" />
  //       <Form.Checkbox label="Sesame" name="Allergies" value="Sesame" />
  //       <Form.Checkbox label="Soy" name="Allergies" value="Soy" />
  //       <Form.Checkbox label="Sulfite" name="Allergies" value="Sulfite" />
  //       <Form.Checkbox label="Tree Nut" name="Allergies" value="Tree Nut" />
  //       <Form.Checkbox label="Wheat" name="Allergies" value="Wheat" />
  //     </Form.Group>
  //   </Form>
  // }

  // makeDietaryRestrictionsForm = () =>{
  //   return <Form>
  //     <Form.Group grouped>
  //       <Form.Checkbox label="Lacto Vegetarian" name="Dietary Restriction" value="Lacto Vegetarian" />
  //       <Form.Checkbox label="Ovo Vegetarian" name="Dietary Restriction" value="Ovo Vegetarian" />
  //       <Form.Checkbox label="Pescetarian" name="Dietary Restriction" value="Pescetarian" />
  //       <Form.Checkbox label="Vegan" name="Dietary Restriction" value="Vegan" />
  //       <Form.Checkbox label="Vegetarian" name="Dietary Restriction" value="Vegetarian" />
  //     </Form.Group>
  //   </Form>
  // }

  // makePercentageMatchForm = () =>{
  //   return <Form>
  //     <Form.Group grouped>
  //       <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label=">90%" id="percentageMatch" value=">90%" />
  //       <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label=">80%" id="percentageMatch" value=">80%" />
  //       <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label=">70%" id="percentageMatch" value=">70%" />
  //       <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label=">60%" id="percentageMatch" value=">60%" />
  //       <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label=">50%" id="percentageMatch" value=">50%" />
  //     </Form.Group>
  //   </Form>
  // }

  //Note: Come back to this item once other functionality is complete
  // makeFlavorProfileForm = () =>{
  //   return <Form>
  //     <Form.Group grouped>
  //       <Form.Checkbox />
  //     </Form.Group>
  //   </Form>
  // }

  make_other_form = () =>{
    return <Form>
      <Form.Group grouped>
        <Form.Checkbox onChange={(evt)=> this.props.filter_recipes(evt)} label="Eat Out" id={`otherFilter-eatOut`} value="Eat Out"/>
        <Form.Checkbox onChange={(evt)=> this.props.filter_recipes(evt)} label="Leftovers" id="otherFilter-leftovers" value="Leftovers" />
      </Form.Group>
    </Form>
  }

  render(){
    const {active_index} = this.state
    return(
      <React.Fragment>
        <Accordion as={Menu} vertical>
          <Menu.Item header>Filter Recipes</Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active= {active_index === 0}
              content="Cuisine"
              index={0}
              onClick = {this.handle_click}
              />
            <Accordion.Content active={active_index === 0} content={this.make_cuisine_form(this.props.cuisines)} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={active_index === 1}
              content = "Courses"
              index={1}
              onClick={this.handle_click}
            />
            <Accordion.Content active={active_index === 1} content={this.make_course_form(this.props.courses)} />
          </Menu.Item>
          {/* <Menu.Item>
            <Accordion.Title
              active={activeIndex === 2}
              content= "Percentage Match"
              index={2}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 2} content={this.makePercentageMatchForm()} />
          </Menu.Item> */}
          <Menu.Item>
            <Accordion.Title
              active={active_index === 3}
              content="Other"
              index={3}
              onClick={this.handle_click}
            />
            <Accordion.Content active={active_index === 3} content={this.make_other_form()} />
          </Menu.Item>
        </Accordion>

      </React.Fragment>
    )
  }
}