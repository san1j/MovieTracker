# MovieTracker

A Node.js+Express.js app for tracking/logging movies


## Link to the project website
[Live project website](https://movie-tracker-node.herokuapp.com)

It might take a while to load the first time

Use the following username and password to login:

Username: username\
Password: password

## Project pics

<img width="1279" alt="screen shot 2018-08-23 at 7 41 29 am" src="https://user-images.githubusercontent.com/36819928/44754926-f8094f00-aaf1-11e8-8737-c0af601aff9b.png">
<img width="1278" alt="screen shot 2018-08-27 at 1 18 39 pm" src="https://user-images.githubusercontent.com/36819928/44754928-fa6ba900-aaf1-11e8-9c8b-702353deb8ab.png">
<img width="1277" alt="screen shot 2018-08-27 at 1 16 08 pm" src="https://user-images.githubusercontent.com/36819928/44754932-fcce0300-aaf1-11e8-9bca-7ba623addd41.png">

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
