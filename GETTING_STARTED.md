# MHLC Web Getting Started Guide

## Prerequisites

### Tools

- [Node.js 20](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- Some sort of IDE (ex. [MS Visual Studio Code](https://code.visualstudio.com/))

### Access

- Contact [@NthngAlone](https://github.com/nthngalone) to be added as a collaborator to the `mhlc-web` repository
- Sign-up for a free [Contentful](https://www.contentful.com) account and request [@NthngAlone](https://github.com/nthngalone) to add you to the MHLC workspace

> Note: the command samples in this guide are assuming that you're using a bash-compatible terminal.  If you are using something different, you may need to adjust the commands to meet your terminals syntax.

## Clone the Repo

```bash
git clone git@github.com:nthngalone/mhlc-web.git
```

## Install the Dependencies

```bash
npm install
```

## Set up Your `.env` File

The `mhlc-content-api` package is a Node.js web API.  It depends on a few environment variables to operate.  It is set up to use a package called `dotenv` that pulls environment variables from a `.env` file in the root of the api folder.

Take a look in the `mhlc-content-api` folder and you will find a `.env.sample` file.  Copy that file to a new file name `.env`.

```bash
cd mhlc-content-api
cp .env.sample .env
```

Your new `.env` file is already set up to be ignored by Git.  This file may contain sensitive data, so it is not to be committed to Git.

Fill in the appropriate values for the environment variables in `.env`.  If you are unsure what to fill in, reach out to @NthngAlone.

## Build and Start the App

Build the front end client by running the command:

```
npm run build:client
```

Then start the application by running:

```
npm start
```

> Note: you can do these in one fell swoop by running `npm run build:client && npm start`.

This will launch a Node.js server using the [Express](https://expressjs.com/) server framework.  You should be able to view the running site by navigating to <http://localhost:3000> in your favorite web browser.

At any time, you can use the key combination of `CTRL+C` in your terminal to kill the server.

## UI Dev Mode

Alternatively, if you are only interested in working on the UI, you do not have to run the full server.  Execute the following command in your terminal:

```
npm run dev:ui
```

This will start up a UI development server, complete with hot reloads, that allows you to complete fast iterations on UI development.

> Note: This mode uses mock data in lieu of responses from the content API, so it may not be a full dataset.  If there is additional data or uses cases that you need, look at updating the mock data at the bottom of the [content store](./mhlc-ui/src/store/content.js).
