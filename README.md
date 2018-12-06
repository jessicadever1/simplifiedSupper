# Simplified Supper
  Insert Simplified Supper description here.

## Table of Contents
  Insert Final Table of Contents here.

## Technologies Used
  ### Development Languages and Libraries
  ### Development Tools

##Instructions for Installing Simplified Supper
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

  {bold} Create a new directory to store the files in. Type this into your terminal window.
    {code snippet}
    mkdir simplified-supper
    cd simplified-supper
    git clone {insert clone link for repo}

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

  {bold} Now create a new directory inside the nutshell directory to store your JSON data. Type:
    {code snippet}
    cd ../..
    mkdir api
    touch api/database.json
    {/code snippet}




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
