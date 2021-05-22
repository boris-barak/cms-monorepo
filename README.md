# cms-monorepo

This is my experimental CMS project where I am trying few technologies, I have learned, combined in a monorepo architecture.

## Prerequisites

- `Docker` installed
- `nvm` installed

## How to run the app

- `nvm use` to use the required `npm` version (if you don't have the one, you have to install it)
- `npm run bootstrap` to install all dependencies
- `npm run start:dev` to run the app in `dev` mode

## What you can try
- `localhost:4000` should be opened automatically
  - demo credentials are written on the login page
  - try edit a page to see the options of the editor
  - try to add and remove various sections of the page
- `localhost:3000`
- `http://localhost:3001/api/` offers a documentation of the `content-service` API

## How is the code structured

The project uses `Lerna` monorepo architecture. It has the main scope with `package.json`, `node_modules`, etc. You can run the scripts across the whole monorepo there.

There are packages in the `packages` directory. The packages use their own libraries and configurations.

- `admin-frontend` is a package containing the frontend part of the administration. It is written in React and consumes both backend services and the common `cms-common` package.
- `auth-service` is a backend service written in Nest.js framework providing authorization and authentication of a user for the administration. This service is not completely done yet and serves only static data for now.
- `cms-common` provides common types and constants to all other packages.
- `content-service` is a backend part storing and serving the content data. It uses `MongoDB` database run automatically via Docker. It's written in Nest.js framework and uses an HTTP REST API for communicating with the frontends. It's documented via `Swagger` on `http://localhost:3001/api/`.
- `public-frontend` is a small frontend written in `Next.js` framework displaying the output of the CMS.

## Few things to do ...

There are still few, mainly security related issues, I would like to still do but there was not much time for those. Hopefully, I will find some time for those one day :-)

- `auth-service` uses hardcoded data only, but I want to use an SQL  database to store the list of users with encrypted passwords.
- `admin-frontend` stores the authorization token in the local store. I want to use a HttpOnly cookie instead. Also using CSRF tokens for the login form would be nice.
- `cms-common` is not compiled. So, we cannot define and use React components there. We already have one where it would be useful.
- `content-service` accepts the mutating requests `post`, `put`, `delete` sent from anywhere. Those should be going through the `auth-service` where we check if the user is authorized.
- `public-frontend` could use cashing of the content.
