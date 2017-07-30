const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');

// Set express view engine to use hbs moudle
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to file');
        }
    });
    next();
});

/* app.use((req, res, next) => {
      res.render('Maintanance.hbs');
});
 */

// Declare Static folder for public use & view
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Get homepage
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello & Welcome to my website',
    });
});

// Get aboutpage
app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle : 'About Page',
   }); 
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', { 
        pageTitle: 'Projects'
    });
});

// Start server by listening to port 8080
app.listen(port);
console.log(`Server is Running... on port ${port}`);
