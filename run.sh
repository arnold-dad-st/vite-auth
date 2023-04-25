#!/bin/bash

# Change directory to the server app directory
cd ./server

# Install server app dependencies
npm install

# Start the server app
npm start &

# Change directory to the front-end app directory
cd ../

# Install front-end app dependencies
npm i

# Start the front-end app in development mode
npm run dev
