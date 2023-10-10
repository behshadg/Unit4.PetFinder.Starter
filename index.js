// Psuedocode:
//Task 1:
// Create a route that listens for GET requests at '/api/v1/pets'.
// When someone makes a GET request to '/api/v1/pets':
//   - Retrieve all pets from the 'pets' array.
//   - Send the list of pets as a JSON response.

//Task 2:
// Create a route that listens for GET requests at '/api/v1/pets/:name'.
// When someone makes a GET request to '/api/v1/pets/:name':
//   - Extract the 'name' parameter from the request URL.
//   - Find the pet in the 'pets' array with the matching name.
//   - Send the pet's information as a JSON response.

//Task 3:
// Create a route that listens for GET requests at '/api/v1/pets/owner'.
// When someone makes a GET request to '/api/v1/pets/owner':
//   - Extract the 'owner' query parameter from the request.
//   - Find all pets in the 'pets' array that have the specified owner.
//   - Send the list of matching pets as a JSON response.

//Task 4:
// Serve static files (HTML, CSS, JavaScript) from the 'public' directory using 'express.static'.
// Create a front-end application (HTML, React, etc.) that interacts with the API endpoints created in tasks 1, 2, and 3.
// When users visit the site in a web browser:
//   - They should see your front-end application.
//   - Your front-end application should have buttons or links to trigger requests to the API endpoints.
//   - The API should respond with data, and your front-end should display it to users.

// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

// For testing
const cors = require('cors');
app.use(cors());

const PORT = 8080;

app.use(express.static('public'));

// GET - / - returns homepage
//app.get('/', (req, res) => {});

// hello world route
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
  res.send(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner/:owner', (req, res) => {
  const owner = req.params.owner;
  const pet = pets.find((pet) => pet.owner === owner);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
  // send the pet as a response
});

// get pet by name
app.get('/api/v1/pets/name/:name', (req, res) => {
  const name = req.params.name;

  const pet = pets.find((pet) => pet.name === name);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});

module.exports = app;
