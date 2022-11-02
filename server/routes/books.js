/******************************
 File: book.js
 Author: Ying Shen
 Student ID: 301273924
 Web app: Favourite Book List
 ******************************/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  /*****************
     * ADD CODE HERE *
     *****************/
  res.render("books/details", {
    title: 'Enter Book Details',
    books: books()
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  const myBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  // var myData = new book(req.body);

  book.create(myBook, (err, Book) => {
    if (err) {
      res.status(400).send("unable to save to database");
    }
    else {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  book.findById(req.params.id, function (err, foundBook) {
    if (err) {
      res.redirect("/");
    }
    else {
      res.render("books/details", { title: 'Edit Book Details', books: foundBook });
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  let data = req.body;
  let id = req.params.id;
  const editBook = book({
    _id: id,
    Title: data.title,
    Price: data.price,
    Author: data.author,
    Genre: data.genre
  });

  book.updateOne({ _id: id }, editBook, err => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  book.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      res.redirect("/books");
    } else {
      res.redirect("/books");
    }
  })
});


module.exports = router;
