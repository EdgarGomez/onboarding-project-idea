# Onboarding project concept

## Definition

To understand how the project has evolved you have to navigate through the different branches.

### Branch feature/00-Start
Project started with CRA (create-react-app) and css. Simple screen with a form where user can add veterinarian appointments and see the appointments list. The first approach is managing the data in local storage.

### Branch feature/01-testing
Focused on developing under TDD and added unit tests and integration tests with Jest and end to end tests with cypress.

### Branch feature/02-styledcomponents
Removed all the possible css and created news components with styled components like titles, buttons and wrappers keeping the same design.

### Branch feature/03-typescript
Migrated to typescript transforming all .js files to .tsx, adding a tsconfig.json and applying types in every file to match the basics and good practices of typescript.

### Branch feature/04-graphql
Added apollo and grapqhl dependencies, created a fake local API and removed local storage management for appointments to make it work directly with queries and mutations with graphql.

## Setup

Once cloned install dependencies with `npm i`

To start the API run `json-graphql-server db.js --p 4000`

To start the project run `npm start`

To run the tests with cypress run `npx cypress open` for visual tool or `npx cypress run` for cli tool.