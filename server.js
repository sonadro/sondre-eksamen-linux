const express = require('express');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

app.listen(80);
console.log('Connected!');

// page routes
app.get('/', (req, res) => res.redirect('/hjem'));
app.get('/hjem', (req, res) => res.render('index'));
app.get('/kart', (req, res) => res.render('kart'));
app.get('/database', (req, res) => res.render('database'));

// page not found
app.use((req, res) => res.status(404).render('404'));