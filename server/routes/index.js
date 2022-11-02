/******************************
 File: index.js
 Author: Ying Shen
 Student ID: 301273924
 Web app: Favourite Book List
 ******************************/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
  });
});

module.exports = router;
