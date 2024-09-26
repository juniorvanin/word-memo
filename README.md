# Getting Started
This is the frontend and backend applications of Word Memo.

## How to run the backend

Before starting, make sure you have the latest version of node and docker installed in your machine. Rename .env.dev to .env and replace the variables by the correct values. Inside the api folder run the following commands:

### `docker-compose up db`
This command will run the database locally. 

### `npm run start:dev`
Runs the app in the development mode.

## Run the frontend

The frontend App was created using create-react-app and you can run the client by navigating to the client folder and run the command: 

### `npm run start`

## Additional commands in the FE

In the client folder, you can run:

### `npm test`

Run the unit tests.

### `npm run storybook`

Run the storybooks and manually check the visual consistency of the components.

### `npm run format`

Format the code using prettier


## Additional commands in the BE

In the api folder, you can run:

### `npm test`

Run the unit and integration tests. In order to run e2e tests, you need to run the database using the command `docker-compose up db`.

### `npm run migration:generate`

Use this command to create new migrations based on your database entities.

### `npm run format`

Format the code using prettier