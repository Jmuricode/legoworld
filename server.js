/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: ______________________ Student ID: ______________ Date: ______________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Sample data for Lego sets (replace this with your actual data)
const legoSets = [
  { set_num: '001-1', name: 'Lego Set 1', img_url: 'set1.jpg' },
  { set_num: '002-1', name: 'Lego Set 2', img_url: 'set2.jpg' },
  { set_num: '003-1', name: 'Lego Set 3', img_url: 'set3.jpg' },
];

// Route to serve the home.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Route to serve the about.html file
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// Route to serve Lego sets based on the 'theme' query parameter
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    // Filter Lego sets by theme (replace this logic with your data source)
    const filteredSets = legoSets.filter((set) => set.theme === theme);
    res.json(filteredSets);
  } else {
    // Return all Lego sets
    res.json(legoSets);
  }
});

// Route to serve details of a specific Lego set by set_num
app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  // Find the Lego set with the specified set_num (replace this logic with your data source)
  const selectedSet = legoSets.find((set) => set.set_num === setNum);
  if (selectedSet) {
    res.json(selectedSet);
  } else {
    // Return a 404 error if the set is not found
    res.status(404).send('Lego set not found.');
  }
});

// Route for handling 404 errors
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
