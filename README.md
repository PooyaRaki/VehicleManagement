
# Vehicle Management

This is a Vehicle Management app.


## Features

- Vehicle management
- Vehicle clustering


## Tech Stack

**Server:** Node.js (Express), Typescript, RestAPI, Docker, SQLite
## Environment Variables

To run this project, you will need to run each micro service separately

`NODE_ENV` The environment the app is running on i.e. production, development

`PORT` The port which the server should listen to

`TZ` App Timezone

`API_FEED_URL` is The path to which the endpoint should be located. By default, it is /api

`DATABASE_URL` Database Url
## Installation

Install Business Checklist:

Install dependencies
```bash
  cd services/vehicle-service
```
```bash
  npm install
```
Run the server
```bash
  npm run start:prod
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/PooyaRaki/VehicleManagement.git
```

Go to the project directory

```bash
  cd services/vehicle-service
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```


## Roadmap

- Adding more unit tests

- Adding docker containers

- Adding worker threads


## License

[GPL-3.0 license](https://github.com/PooyaRaki/TaskManager/blob/master/LICENSE)


## Authors

- [@PooyaRaki](https://github.com/PooyaRaki)

