## Nightlife Coordination App

An application that allows the user to search for and track bars built with MongoDB, Express, React, Node, Javascript, and CSS.

## Screen Shots(s)

![screenshot1](client/public/screenshot1.png)
![screenshot2](client/public/screenshot2.png)
![screenshot3](client/public/screenshot3.png)

## Installation and Setup Instructions

Clone this repository (You will need `node` and `npm` installed globally on your machine)

Installation:

`npm install`<br>
`cd client`<br>
`npm install`<br>
`cd ..`

Set Environment Variables:

`touch config.env`<br>
`(Set variables "ATLAS_URI", "SESSION_SECRET", and "YELP_API_KEY" in file)`

To Start Server:

`npm start`

To Start Client:

`(Open new console tab)`<br>
`cd client`<br>
`npm start`

To Visit App:

`localhost:3000`

## Summary

- Application features:
  - Search for bars as an unauthenticated or authenticated user
  - Add bars to your profile as an authenticated user
- What was the purpose of this project?
  - Practicing full-stack development using React for the frontend, Node and Express for the backend, and MongoDB for the database
  - Implementing a basic authentication system using username and password
  - Deploying a MERN app to Heroku
- What are some features/improvements that can be added?
  - Showing bar locations on a visual map