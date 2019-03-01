# How to start:
Use npm install command to install node modules. 
Use "NPM run start" command for starting the webdevserver and node server. Application will run on "http://localhost:9000/".
For initial data entry, please use tasks.json in directory. 
Later on the tasks.json is moved to server build folder using webpack config for further usage by the application. This file being used as a DB for the sake of application.

Error handling: Debounce is not used to everywhere to show for error handling implementation. Enter value in input box for title and press enter repititively, it should trigger server side error and a toast will come up.


# Inclusions
* React 16.7 - Done
* Redux implementation.
* Express server implementation with middleware.
* SASS used for styling.
* Responsive and simple intuitive design.
* Server response error handling

# Pending
* unit-tests for the UI 
* Server test cases
