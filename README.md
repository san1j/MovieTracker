# MovieTracker

A Node.js+Express.js app for tracking/logging movies


## Link to the project website
[Live project website](https://movie-tracker-node.herokuapp.com)

It might take a while to load the first time

Use the following username and password to login:

Username: username\
Password: password

## Config
Movie data is from [TMDb](https://www.themoviedb.org). Obtain an API key from TMDb by following the instructions [here](https://developers.themoviedb.org/3/getting-started/introduction).

Add your API key and your MongoDB URI (or mLab URI) to the .env file

## How to Run
Clone or download this repo

Install [node.js](https://nodejs.org/en/download/) and run
```node -v ```to make sure it's installed.

Run ```npm install ``` to install all the dependencies for this project
and ```npm start``` to run the project.\
The project should be up and running on ```localhost:3000```

Run all tests with ```npm test```

## API endpoints
```GET /users/:username/all ```   --- Get all movie diary entries for a particular user\
```POST /users/:username/diary```  --- Add a new diary entry for a user\
```PUT /users/:username/diary/:title``` --- Edit a movie diary entry\
```DELETE /users/:username/delete/:title``` --- Delete a movie diary entry for a user

```GET /users```  --- Get all users\
```GET /users/:username ```--- Get a particular user\
```POST /users/:username/add```--- Add a new user\
```DELETE /users/:username```--- Delete a user by username

```GET /users/:username/reviews/all``` --- Get all movie reviews by a particular user\
```POST /users/:username/review/:movieId```--- Add a new movie review for a movieId\
```PUT /users/:username/review/:id```  --- Edit a movie review\
```DELETE /users/:username/review/:id```---  Delete a movie review

## License:
MIT
