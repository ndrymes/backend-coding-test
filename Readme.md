# Xendit Test

The task is to build a RESTful API to create ride details and also fetch ride data from an in memory database.

# Get Started

- Clone the repository using git clone https://github.com/ndrymes/backend-coding-test
- Run `npm i` or `npm install` to install all app dependencies
- Make a copy of the sample.env file and rename to .env
- Start the app using
  - `npm run dev` for development
  - `npm run start` for production

# Demo

The app is hosted on heroku. The base url is <a href="https://immense-stream-85373.herokuapp.com/">https://immense-stream-85373.herokuapp.com/</a>.
The default endpoint is an health check endpoint that returns a success response.

## API

There are multiple endpoints that can be used to retrieve records. Please find below a POSTMAN documentation url is <a href="https://documenter.getpostman.com/view/7667873/U16nL4dw">https://documenter.getpostman.com/view/7667873/U16nL4dw</a>.

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| Base Url    | https://immense-stream-85373.herokuapp.com/ |
| Http Method | POST                                        |
| Path        | /rides                                |
| Http Method | GET                                       |
| Path        | /rides                                |
| Http Method | GET                                       |
| Path        | /rides:id                               |


> These codes are custom to the app and the http status codes are still going to be sent 

### Request Parameters

```
    {
    "start_lat": "90",
    "start_long": "90",
    "end_lat": "90",
    "end_long": "90",
    "rider_name": "wolex",
    "driver_name": "wede",
    "driver_vehicle": "heree"
  }
```

### Sample Success Response Parameters

```
   [
    {
        "rideID": 1,
        "startLat": 90,
        "startLong": 90,
        "endLat": 90,
        "endLong": 90,
        "riderName": "wolex",
        "driverName": "wede",
        "driverVehicle": "heree",
        "created": "2021-09-11 18:46:19"
    }
]
```

### Sample Error Response Parameters

```
    {
    "error_code": "RIDES_NOT_FOUND_ERROR",
    "message": "Could not find any rides"
   }

```

# Project Structure
![file structure](https://i.ibb.co/KVyzY5C/structure.png)

# Libraries Used

- Mocha - For running unit tests
- Express - Popular framework with a robust set of features for running apps
- sqlite3 - ODM for MySQl that makes maning the database much easier


# Todo

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially integration tests, unit tests for the services and api tests using super test.
- Use a DTO object to handle transfer of data from the api routes to the service layer, this will help keep data consistent even data names change
- Add a dependency injection library like awilix to handle injection of dependencies
- Include a makefile to ease the execution of some common tasks
- Role based authorization

# Testing

- To run the tests, simply type `npm test`
- We can also get code coverage by `npm run coverage`
- We can load test by running `npm run test:load`

Thank you 👍
