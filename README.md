# Large header
## Smaller header
* Bullet point
* Chapter 5 - [Using the Debugger](./chapters/MISC_DEBUGGING.md)

```js
```

```sh
```

# Simplified Supper
  Insert Simplified Supper description here. Introduction to the app, why I built it and how it benefits the user

## Table of Contents
  * [Project Requirements and Features List](INSERT LINK HERE)
  * [Technologies Used](INSERT LINK HERE)
  * [Installing and Launching Simplified Supper](INSERT LINK HERE)
  * [Appendix 1: Planning Documentation](INSERT LINK HERE)
    * [Entity Relationship Diagrams](INSERT LINK HERE)
    * [Wireframes](INSERT LINK HERE)
  * [Appendix 2: Set Up Instructions](INSERT LINK HERE)
    * [Sub-directory 1](INSERT LINK HERE)
    * [Sub-directory 2](INSERT LINK HERE)
    * [Sub-directory 3](INSERT LINK HERE)

## Project Requirements and Features List

  ## Topics Covered Building Simplified Supper
  1. Functions
  1. Stand-up Meetings
  1. ERD Diagrams
  1. React
  1. State-management
  1. Databases/API
  1. Working with external APIs
  1. Git/ Github
  1. Objects
  1. Handling user events
  1. Factory Functions
  1. Data entry/editing
  1. Modular Code
  1. Relational Data

## Technologies Used
  ### Development Languages and Libraries
  ### Development Tools

##Instructions for Installing Simplified Supper
{bold} To launch the Simplified Supper app, you will need to have access to command line tools, node package manager, JSON Server. If you do not have access to any of these tools, you can find instructions for installing them in the Appendix. {Link to Appendix}

{bold} Clone this repo on you personal machine using the following command
    ```sh
    git clone {insert clone link for repo}
  ```

{bold} Install the NPM dependencies for this project using the following commands
  ```sh
  cd simplified-supper
  npm install
  ```

{bold} Now create a new directory inside the simplified supper directory to store your JSON data
    ```sh
    mkdir api
    touch api/database.json
    ```

{bold} open database.json and paste in the following test data
  ```json
  {INSERT JSON FILE HERE}
  ```

{bold} Now you're ready to launch the app, in your terminal window, type.
   ```sh
   cd simplified-supper/api
   json-server -p 8088 database.json
   ```

{bold} From your terminal window, type Command T, then in the new tab type
  ```sh
  cd simplified-supper
  npm start
  ```

{bold} Now that the server is up and running, you can open an internet browser and access the application
  ```sh
  http://localhost:8080/
  ```

{Bold larger text}
  Congratulations you are now experiencing Simplified Supper!

  ## Appendix 1: Planning Documentation

  ### Entity Relationship Diagrams
    {INSERT ERD HERE}

  ### Wireframes/ Mockups
    {INSERT WIREFRAMES/MOCKUPS HERE}


  ## Appendix 2: Set Up Instructions

  {bold} You will need to have command line tools installed for your computer to use terminal commands.
  Mac users follow the instructions below
  Linux/ Windows users, please visit the Git page {link} and follow the instructions for set up

 {bold}Open your terminal and type
  {code snippet} git --version

  {bold} You will now need to configure your git account. In the terminal window, type:
    {code snippet}
    git config -global user.name "Your Name"
    gut config -global user.email "Your Email"
    {/code snippet}

  {bold} If you do not have Node.js installed on your machine, visit the {link} Node.js Download Page {/link} and follow the instructions. To ensure that it is installed correctly, in your terminal window, type
    {code snippet}
    echo $PATH
    {/code snippet}

    Ensure that the result has the following in the $PATH
    {code snippet}
      /usr/local/bin
    {/code snippet}
    or
    {code snippet}
      /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
    {/code snippet}
    {bold} You will need to go into the lib folder in your directory and install and build npm modules and also your json-server. In your terminal, type
    NOTE: I need to double check this process, this may be outdated with react
    {code snippet}
      cd simplified-supper/src/lib
      npm init
      npm i
      sudo npm install -g json-server
    {/code snippet}

  {bold} In order to create and edit the required JSON file, you will need a text editor. For this project we used VS Code. Visit VSCode {Link} to install a copy.









This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
