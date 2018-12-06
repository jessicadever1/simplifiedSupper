const URL = "http://localhost:8088/"
const YummlyURL ="http://api.yummly.com/v1/api/recipes?_app_id=cd5fb393&_app_key=fe16ea520b72c15ff39525eed9947f8f"

 class APIManager{
  getAllCategory(category) {
    return fetch(`${URL}${category}`)
      .then(entries => entries.json())
  }

  getOneFromCategory(category, id) {
    return fetch(`${URL}${category}/${id}`)
      .then(inputs => inputs.json())
  }

  saveItem(category, item) {
    return fetch(`${URL}${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    ).then(jsonData => jsonData.json())
  }

  deleteItem(category, id) {
    return fetch(`${URL}${category}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  updateItem(category, id, item) {
    console.log(item)
    return fetch(`${URL}${category}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
  }

  newUserSuggestedRecipes(cuisine, course){
    let exculdedCuisines = []
    let updatedCuisines = []
    this.getAllCategory("cuisines")
    .then((results)=>{
      results.forEach(result =>{
        if(result.text !==  cuisine){
          exculdedCuisines.push(result.text)
        }
      })
      exculdedCuisines.forEach(item =>{
         updatedCuisines.push(`&excludedCuisine[]=cuisine^cuisine-${item}`)
      })
      console.log(updatedCuisines.join(''))
      // return fetch(`${YummlyURL}&allowedCuisine[]=cuisine^cuisine-${cuisine}&allowedCourse[]=course^course-${course}${updatedCuisines.join('')}`)
    })
    .then(results => results.json())
    .then(recipes => console.log(recipes))
  }

}

export default new APIManager()

// http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
// &allowedCourse[]=course^course-Appetizers
// http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
// &allowedCuisine[]=cuisine^cuisine-american

/*
id: cd5fb393
key:
fe16ea520b72c15ff39525eed9947f8f
*/