/*
Given the user has an account with Simplified Supper
When the user is logged in to their account
Then they should have an option to view their profile information

When the user selects the option to view their profile information
Then they should be taken to a screen that displays their name, username, email, picture, and password
And be provided the opportunity to edit their information

When the user selects the affordance to edit their profile information
Then the information should populate into a form
And allow the user to update the information

When the user submits updated information
Then the database should be checked for any conflicts for username or email address
If there is a conflict
Then the user should see an error message that prompts them to update the information
If there is not a conflict the form should close and the database should be updated
*/