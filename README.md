# Simplified Supper
  Simplified Supper is intended to make meal planning easy, allowing the user to see at a glance what they have coming up so grocery shopping is a breeze. By looking at the meals the user has planned for the week, Simplified Supper provides suggested recipes based on the percentage of ingredients that can be repurposed from your chosen meals.

## Table of Contents
  * [Project Requirements and Features List](#project-requirements-and-features-list)
  * [Technologies Used](#technologies-used)
  * [Installing and Launching Simplified Supper](#instructions-for-installing-simplified-supper)
  * [Appendix 1: Planning Documentation](#appendix-1-planning-documentation)
    * [Entity Relationship Diagrams](#entity-relationship-diagrams)
    * [Wireframes](#wireframes)
  * [Appendix 2: Set Up Instructions](#appendix-2-set-up-instructions)

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
  <!-- Images for semantic ui for react, react big calendar -->
  <img src="./src/images/react.png" width="15%"></img> <img src="./src/images/moment.jpg" width="15%"></img> <img src="https://cloud.githubusercontent.com/assets/4307137/10105284/26aa7ad4-63ae-11e5-88b7-bc523a095c9f.png" width="15%"></img> <img src="https://cloud.githubusercontent.com/assets/4307137/10105288/28698fae-63ae-11e5-8ba7-a62360a8e8a7.png" width="15%"></img> <img src="https://cloud.githubusercontent.com/assets/4307137/10105283/251b6868-63ae-11e5-9918-b789d9d682ec.png" width="15%"></img> <img src="https://cloud.githubusercontent.com/assets/4307137/10105290/2a183f3a-63ae-11e5-9380-50d9f6d8afd6.png" width="15%"></img>

  ### Development Tools
  <!-- Images for wireframe tool -->
  <img src="./src/images/github.jpg" width="15%"></img> <img src="./src/images/draw.io.jpg" width="15%"></img> <img src="https://cloud.githubusercontent.com/assets/4307137/10105284/26aa7ad4-63ae-11e5-88b7-bc523a095c9f.png" width="15%"></img>

## Instructions for Installing Simplified Supper
  To launch the Simplified Supper app, you will need to have access to command line tools, node package manager, JSON Server. If you do not have access to any of these tools, you can find instructions for installing them in the [Appendix.](#appendix-2-set-up-instructions)

  Clone this repo on you personal machine using the following command
  ```sh
    git clone git@github.com:kellymorin/simplifiedSupper.git
  ```

  Install the NPM dependencies for this project using the following commands
  ```sh
    cd simplified-supper
    npm install
  ```

  Now create a new directory inside the simplified supper directory to store your JSON data
  ```sh
    mkdir api
    touch api/database.json
  ```

  open database.json and paste in the following test data
    <!-- TODO: Insert finalized JSON file -->
  ```json
    {INSERT JSON FILE HERE}
  ```

  Now you're ready to launch the app, in your terminal window, type.
  ```sh
    cd simplified-supper/api
    json-server -p 8088 database.json
  ```

  From your terminal window, type Command T, then in the new tab type
  ```sh
    cd simplified-supper
    npm start
  ```

  Now that the server is up and running, you can open an internet browser and access the application
  ```sh
    http://localhost:8080/
  ```

 ### Congratulations you are now experiencing Simplified Supper!

  ## Appendix 1: Planning Documentation

  ### Entity Relationship Diagrams
  <!-- FIXME: Link to ERD currently broken -->
  ![Simplified Supper ERD](/src/images/Simplified_Supper_ERD.pdf)

  ### Wireframes/ Mockups
  ![Log In Page](/src/images/wireframe_1.png)
  ![New User Intro Screen](/src/images/wireframe_2.png)
  ![New User Intro Screen 2](/src/images/wireframe_3.png)
  ![Recipe Options Display](/src/images/wireframe_4.png)
  ![Recipe Detail Card](/src/images/wireframe_5.png)
  ![Main View](/src/images/wireframe_6.png)


  ## Appendix 2: Set Up Instructions

  You will need to have command line tools installed for your computer to use terminal commands.

  Linux/ Windows users, please visit the [Git page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for set up

  Mac users follow the instructions below

  Open your terminal and type
  ```sh
    git --version
  ```

  You will now need to configure your git account. In the terminal window, type:
  ```sh
    git config -global user.name "Your Name"
    git config -global user.email "Your Email"
  ```

  If you do not have Node.js installed on your machine, visit the [Node.js Download Page](https://nodejs.org/en/download/) and  follow the instructions. To ensure that it is installed correctly, in your terminal window, type
  ```sh
    echo $PATH
  ```
  Ensure that the result has the following in the $PATH
  ```sh
    /usr/local/bin
    or
    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
  ```

  You will need to go into the lib folder in your directory and install and build npm modules and also your json-server. In your terminal, type
  <!-- FIXME: I need to double check this process, this may be outdated with react -->
  ```sh
    cd simplified-supper/src/lib
    npm init
    npm i
    sudo npm install -g json-server
  ```

  In order to create and edit the required JSON file, you will need a text editor. For this project we used VS Code. Visit [VSCode](https://code.visualstudio.com/) to install a copy.









This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.




## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
