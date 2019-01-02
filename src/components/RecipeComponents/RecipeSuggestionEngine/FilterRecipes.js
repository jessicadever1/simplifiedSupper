import React, {Component} from 'react'
import { Menu, Form, Accordion} from 'semantic-ui-react';

export default class FilterRecipes extends Component{
  state = {activeIndex: 0}

  handleClick = (e, titleProps) =>{
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }
  makeCuisineForm = (cuisines) =>{
    return <Form className="filter">
      <Form.Group grouped>
        {
          cuisines.map(cuisine =>{
            return <Form.Checkbox key={cuisine.id} label={cuisine.text} id={`cuisine-${cuisine.id}`} onChange={(evt) => this.props.filterRecipes(evt)} value={cuisine.text}/>
          })
        }
      </Form.Group>
    </Form>
  }

  makeCourseForm = (courses) =>{
    return <Form className="filter">
      <Form.Group grouped>
        {
          courses.map(course =>{
            return <Form.Checkbox key={course.id} label={course.text} id={`course-${course.id}`} value={course.text} onChange={(evt)=> this.props.filterRecipes(evt)}/>
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

  makeOtherForm = () =>{
    return <Form>
      <Form.Group grouped>
        <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label="Eat Out" id={`otherFilter-eatOut`} value="Eat Out"/>
        <Form.Checkbox onChange={(evt)=> this.props.filterRecipes(evt)} label="Leftovers" id="otherFilter-leftovers" value="Leftovers" />
      </Form.Group>
    </Form>
  }

  render(){
    const {activeIndex} = this.state
    return(
      <React.Fragment>
        <Accordion as={Menu} vertical>
          <Menu.Item header>Filter Recipes</Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active= {activeIndex === 0}
              content="Cuisine"
              index={0}
              onClick = {this.handleClick}
              />
            <Accordion.Content active={activeIndex === 0} content={this.makeCuisineForm(this.props.cuisines)} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content = "Courses"
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={this.makeCourseForm(this.props.courses)} />
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
              active={activeIndex === 3}
              content="Other"
              index={3}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 3} content={this.makeOtherForm()} />
          </Menu.Item>
        </Accordion>

      </React.Fragment>
    )
  }
}