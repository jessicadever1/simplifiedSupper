const URL = "http://localhost:8088/"
// const YummlyDetails="http://api.yummly.com/v1/api/recipe/"
// const YummlyAuth = "?_app_id=cd5fb393&_app_key=fe16ea520b72c15ff39525eed9947f8f"

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
    // console.log(URL, category, id)
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


  // getRecipeDetails(id){
  //   return fetch(`${YummlyDetails}${id}${YummlyAuth}`)
  //   .then(results => results.json())
  // }

}

export default new APIManager()



/*
id: cd5fb393
key:
fe16ea520b72c15ff39525eed9947f8f
*/